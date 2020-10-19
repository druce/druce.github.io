---
id: 7104
title: 'Hyperparameter tuning with XGBoost, Ray Tune, Hyperopt and Optuna'
date: 2020-10-12T22:28:57+00:00
author: Druce Vertes
layout: post
guid: /?p=7104
permalink: /2020/10/hyperparameter-tuning-with-xgboost-ray-tune-hyperopt-and-optuna
categories: datascience
tags: datascience

---
> Bayesian optimization for hyperparameter tuning is faster and more effective than grid search. Let's demonstrate how we can speed up hyperparameter tuning with: 1) Bayesian optimization modules like HyperOpt and Optuna, running on… 2) the [Ray](https://ray.io/) distributed ML framework, with a [unified API to many hyperparameter search algos](https://medium.com/riselab/cutting-edge-hyperparameter-tuning-with-ray-tune-be6c0447afdf) with early stopping and… 3) a distributed cluster of cloud instances for even faster tuning.

<!--more-->

## Outline:

1. Results
2. Hyperparameter tuning overview
3. Bayesian optimization overview
4. Early stopping
5. Implementation details
6. Baseline linear regression with no hyperparameters
7. ElasticNetCV (Linear regression with L1 and L2 regularization)
8. ElasticNet with GridSearchCV 
9. XGBoost: sequential grid search over hyperparameter subsets with early stopping 
10. XGBoost: HyperOpt and Optuna search algorithms
11. LightGBM: HyperOpt and Optuna search algorithms
12. XGBoost: HyperOpt on a Ray cluster
13. LightGBM: HyperOpt on a Ray cluster
14. Concluding remarks

## 1. Results

Bottom line up front -- Here are results on the Ames housing data set, predicting Iowa home prices:

<style>table{
    border-collapse: collapse;
    border:2px solid #000000;
}
th{
    border:2px solid #000000;
}
td{
    border:1px solid #000000;
}</style>

#### XGB and LightGBM with various hyperparameter optimization methodologies


| ML Algo          | Search algo                  | CV Error (RMSE in $) | Time h:mm::ss |
|:-----------------:|:----------------------------:|:--------------------:|:--------:|
| XGB               | Sequential Grid Search               | 18193           |  1:24:22  |
| XGB               | HyperOpt (128 samples)               | 18338           |  7:31  |
| XGB               | Optuna (256 samples)                 | 18393           |  11:52  |
| LightGBM          | HyperOpt (256 samples)               | 18475           |  16:52  |
| LightGBM          | Optuna (256 samples)                 | 18679           |     7:51      |
| XGB               | HyperOpt (1024 samples) - 16x cluster | 18321           |     31:44     |
| XGB               | Optuna (1024 samples) - 16x cluster | 18315           |     26:48     |
| LightGBM          | HyperOpt (1024 samples) - 16x cluster | 18475           |     24:46     |
| LightGBM          | Optuna (1024 samples) - 16x cluster | 18535           | 42:38  |


#### Baseline linear models


|      ML Algo      |        Search algo         | CV Error (RMSE in $) | Time mm::ss |
| :---------------: | :------------------------: | :------------------: | :---------: |
| Linear Regression |             --             |        18192         |    0:01     |
|    ElasticNet     | ElasticNetCV (Grid Search) |        18061         |    0:02     |
|    ElasticNet     |        GridSearchCV        |        18061         |    0:05     |
|                   |                            |                      |             |


Times for single instance are on a local desktop with 12 threads, comparable to EC2 4xlarge. Times for the cluster are on m5.large x17 (1 head node + 15 workers)

We see considerable speedup when using HyperOpt and Optuna, and the cluster. RMSEs are comparable, although our manual grid search is best. But our feature engineering was quite good and our simple linear model baselines outperform boosting. (Not shown, SVR and KernelRidge are high-performing and an ensemble improves over all individual algos)

## 2. Hyperparameter Tuning Overview

(If you are not a data scientist ninja, here is some context. If you are, you can safely skip to Bayesian optimization or the implementations.)

Any sufficiently advanced machine learning model is indistinguishable from magic, and any sufficiently advanced machine learning model needs good tuning.

Backing up a step, here is a typical modeling workflow:

- Exploratory data analysis: understand your data.
- Feature engineering and feature selection: clean, transform, and engineer the best possible features
- Modeling: model selection and hyperparameter tuning to identify the best model architecture, ensembling to combine multiple models
- Evaluation: Describe the out-of-sample error and its expected distribution.

To minimize the out-of-sample error, you minimize the error from *bias*, meaning the model isn't sufficiently sensitive to the signal in the data and *variance*, meaning the model is too sensitive to the signal specific to the training data in ways that don't generalize out-of-sample. Modeling is 90% data prep, the other half is all finding the [optimal bias-variance tradeoff](http://scott.fortmann-roe.com/docs/BiasVariance.html). 

Hyperparameters let you tune the bias-variance tradeoff. For a simple logistic regression predicting survival on the Titanic, the regularization parameter lets you control overfitting by penalizing sensitivity to any individual feature. For a massive neural network doing machine translation, the number and types of layers, units, activation, in addition to regularization, are hyperparameters. 

*Gradient boosting* is a tree-based method. A decision tree constructs rules like, if the passenger is in first class and female, they probably survived the sinking of the Titanic. Trees are powerful, but a single deep decision tree with all your features will tend to overfit the training data. A *random forest* algorithm builds many decision trees based on random subsets of observations and features which then vote (*bagging*). The outcome of the vote is less overfitted than training on all the data and all the features, and performs better out-of-sample. Random forest hyperparameters include the number of trees, tree depth, how many features and observations each tree should use. 

*Bagging* like random forest uses many independent trees in parallel. *Boosting* uses many trees in series:

- Start with a simple estimate like the median or base rate
- Fit a tree to the *error* in this prediction
- If you can *predict* the error, you can *adjust* for it and improve the prediction. Adjust the prediction not all the way to the tree prediction, but part of the way based on a *learning rate* (a hyperparameter)
- Fit another tree to the error in the updated prediction and adjust the prediction further based on the learning rate
- Iteratively continue reducing the error for a specified number of boosting rounds (another hyperparameter)

The final estimate is the initial prediction plus the sum of all the predicted necessary adjustments (weighted by the learning rate). 

Gradient boosting is the current state of the art for regression and classification on traditional structured tabular data (in contrast to less structured data like image/video/natural language processing which benefit from deep learning). 

Gradient boosting algorithms like  [XGBoost](https://xgboost.readthedocs.io/en/latest/parameter.html), [LightGBM](https://lightgbm.readthedocs.io/en/latest/Parameters.html) and [CatBoost](https://catboost.ai/docs/concepts/python-reference_parameters-list.html) have a very large number of hyperparameters, and tuning is a very important part of using them.

Here are [the principal approaches to hyperparameter tuning](https://en.wikipedia.org/wiki/Hyperparameter_optimization)

- *Grid search*: given a finite set of discrete values for each hyperparameter, exhaustively cross-validate all combinations

- *Random search*: given a discrete or continuous distribution for each hyperparameter, randomly sample from the joint distribution. Generally [more efficient than exhaustive grid search.](https://dl.acm.org/doi/10.5555/2188385.2188395 ) 

- *Bayesian optimization*: update the search space as you go based on outcomes of prior searches.

- *Gradient-based optimization*: attempt to estimate the gradient of the cross-validation metric with respect to the hyperparameters and ascend/descend the gradient.

- *Evolutionary optimization*: sample the search space, discard combinations with poor metrics, and genetically evolve new combinations based on the successful combinations.

- *Population-based training*: A method of performing hyperparameter optimization at the same time as training.

In this post we focus on Bayesian optimization with HyperOpt and Optuna. 

## 3. Bayesian Optimization

What is Bayesian optimization? When we perform a grid search, the search space can be considered a [prior](https://en.wikipedia.org/wiki/Prior_probability): we believe that the best hyperparameter vector is in this search space. And *a priori* the hyperparameter combinations have equal probability of being the best combination. So we try them all and pick the best one.

Perhaps we might do two passes of grid search. After an initial search on a broad, coarsely spaced grid, we might do a deeper dive in a smaller area around the best metric from the first pass, with a more finely-spaced grid. In Bayesian terminology we *updated our prior*.

Bayesian optimization starts by sampling randomly, e.g. 30 combinations, and computes the cross-validation metric for each of the 30 randomly sampled combination using *[k-fold cross-validation](https://machinelearningmastery.com/k-fold-cross-validation/)*. Then the algorithm updates the distribution it samples from, so it is more likely to sample combinations similar to the good metrics, and less likely to sample combinations similar to the poor metrics. As it continues to sample, it continues to update the search distribution it samples from, based on the metrics it finds.

![Illustration of random search vs. Bayesian](/assets/2020/optuna_bayesian.png)
Source: [Crissman Loomis, Optuna](https://medium.com/optuna/using-optuna-to-optimize-xgboost-hyperparameters-63bfcdfd3407) 

If good metrics are not randomly distributed but found close to one another in an orderly pattern, Bayesian optimization is likely to be more efficient than random search.

## 4. Early Stopping

If, while evaluating a hyperparameter combination, the eval metric is not improving in training, or just not improving enough to beat our best to date, we can discard a combination before fully training on it. *Early stopping* of unsuccessful training runs increases the speed and effectiveness of our search.

XGBoost and LightGBM helpfully implement early stopping callbacks ([XGBoost](https://xgboost.readthedocs.io/en/latest/python/callbacks.html) ; [LightGBM](https://lightgbm.readthedocs.io/en/latest/pythonapi/lightgbm.early_stopping.html#lightgbm.early_stopping)) to check on training progress and stop a training trial early. HyperOpt, Optuna, and Ray use these callbacks to stop useless trials quickly, and improve performance.

In this post, we will use Asynchronous Successive Halving Algorithm (*[ASHA](https://arxiv.org/abs/1810.05934)*), described in this [blog post](https://blog.ml.cmu.edu/2018/12/12/massively-parallel-hyperparameter-optimization/).

#### Further reading: 

 - [Hyper-Parameter Optimization: A Review of Algorithms and Applications](https://arxiv.org/abs/2003.05689) Tong Yu, Hong Zhu (2020)
 - [Hyperparameter Search in Machine Learning](https://arxiv.org/abs/1502.02127v2), Marc Claesen, Bart De Moor (2015)
 - [Hyperparameter Optimization](https://link.springer.com/chapter/10.1007/978-3-030-05318-5_1), Matthias Feurer, Frank Hutter (2019) 

## 5. Implementation Details

We use data from the [Ames Housing Dataset](https://www.kaggle.com/c/house-prices-advanced-regression-techniques). The original data has 79 raw features. The data we will use has 100 features with a fair amount of feature engineering from [my own attempt at modeling](https://github.com/druce/iowa), which was in the top 5% or so when I submitted it to Kaggle. We model the log of the sale price, and use RMSE as our metric for model selection. We convert the RMSE back to raw dollar units for easier interpretability.

We use 4 regression algorithms:
- *LinearRegression*: baseline with no hyperparameters
- *ElasticNet*: Linear regression with L1 and L2 regularization (2 hyperparameters).
- *XGBoost*
- *LightGBM*

We use 5 approaches :
- *Native CV*: In sklearn if an algo *xxx* has hyperparameters it will often have an *xxxCV* version, like ElasticNetCV, which performs automated hyperparameter tuning over a search space with specified kfolds.
- *GridSearchCV*: Abstracts CV that can wrap around any sklearn algo, running multithreaded trials over specified kfolds. 
- *Manual sequential grid search*: What we typically do with XGBoost, which doesn't play well with GridSearchCV and has too many hyperparameters to tune in one pass.
- *Ray on local machine*: HyperOpt and Optuna with early stopping.
- *Ray on cluster*: Additionally scale out to run a single hyperparameter optimization task over many instances.


## 6. Baseline linear regression

```python
%%time

# always use same RANDOM_STATE k-folds for comparability between tests, reproducibility
RANDOMSTATE = 42
np.random.seed(RANDOMSTATE)

kfolds = KFold(n_splits=10, shuffle=True, random_state=RANDOMSTATE)

MEAN_RESPONSE=df[response].mean()
def cv_to_raw(cv_val, mean_response=MEAN_RESPONSE):
    """convert log1p rmse to underlying SalePrice error"""
    # MEAN_RESPONSE assumes folds have same mean response, which is true in expectation but not in each fold
    # we can also pass the mean response for each fold
    # but we're really just looking to consistently convert the log value to a more meaningful unit
    return np.expm1(mean_response+cv_val) - np.expm1(mean_response)
	
lr = LinearRegression()
# compute CV metric for each fold
scores = -cross_val_score(lr, df[predictors], df[response],
                          scoring="neg_root_mean_squared_error",
                          cv=kfolds,
                          n_jobs=-1)
raw_scores = [cv_to_raw(x) for x in scores]
print("Raw CV RMSE %.0f (STD %.0f)" % (np.mean(raw_scores), np.std(raw_scores)))
```

```Raw CV RMSE 18192 (STD 1839)```

```Wall time: 65.4 ms```

### Notes:
  - Use same kfolds for each run so variation in metric is not due to variation in kfolds
  - We fit on the log response so we convert error back to dollar units, for interpretability.
  - sklearn.model_selection.cross_val_score for evaluation
  - Jupyter %%time magic for wall time
  - n_jobs=-1 to run folds in parallel using all cores available.
  - Note the wall time &lt; 1 second and RMSE of 18192.
  - Full code is on [GitHub](https://github.com/iowa/hyperparameter_optimization.ipynb)
						  
## 7. ElasticNetCV

```python
X_train, X_test, y_train, y_test = train_test_split(df, df[response], test_size=.25)
def evaluate(y_train, y_pred_train, y_test, y_pred_test):
    """evaluate in train_test split"""
    print('Train RMSE', np.sqrt(mean_squared_error(np.expm1(y_train), np.expm1(y_pred_train))))
    print('Train R-squared', r2_score(np.expm1(y_train), np.expm1(y_pred_train)))
    print('Train MAE', mean_absolute_error(np.expm1(y_train), np.expm1(y_pred_train)))
    print()
    print('Test RMSE', np.sqrt(mean_squared_error(np.expm1(y_test), np.expm1(y_pred_test))))
    print('Test R-squared', r2_score(np.expm1(y_test), np.expm1(y_pred_test)))
    print('Test MAE', mean_absolute_error(np.expm1(y_test), np.expm1(y_pred_test)))

elasticnetcv = make_pipeline(RobustScaler(),
                             ElasticNetCV(max_iter=100000, 
                                          l1_ratio=[0.01, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.99],
                                          alphas=np.logspace(-4, -2, 9),
                                          cv=kfolds,
                                          n_jobs=-1,
                                          verbose=1,
                                         ))

elasticnetcv.fit(X_train[predictors], y_train)
y_pred_train = elasticnetcv.predict(X_train[predictors])
y_pred_test = elasticnetcv.predict(X_test[predictors])
evaluate(y_train, y_pred_train, y_test, y_pred_test)
l1_ratio = elasticnetcv._final_estimator.l1_ratio_
alpha = elasticnetcv._final_estimator.alpha_
print('l1_ratio', l1_ratio)
print('alpha', alpha)

elasticnet = ElasticNet(alpha=alpha,
                        l1_ratio=l1_ratio,
                        max_iter=10000)

scores = -cross_val_score(elasticnet, df[predictors], df[response],
                          scoring="neg_root_mean_squared_error",
                          cv=kfolds,
                          n_jobs=-1)
raw_scores = [cv_to_raw(x) for x in scores]
print("Raw CV RMSE %.04f (STD %.04f)" % (np.mean(raw_scores), np.std(raw_scores)))
```

```
Train RMSE 16782.09907754634
Train R-squared 0.954197115772813
Train MAE 11025.896226946616

Test RMSE 17457.333905669522
Test R-squared 0.9391701570474736
Test MAE 12389.820674779756
l1_ratio 0.01
alpha 0.005623413251903491

Raw CV RMSE 18122.0127 (STD 2074.9545)

Wall time: 3.16 s

```
### Notes:
 - ElasticNet is linear regression with L1 and L2 regularization (2 hyperparameters)
 - When we use regularization, we need to scale the data so the coefficient penalty has a similar impact across features. We use a pipeline with RobustScaler for scaling.
 - Fit data and extract hyperparameters from the fitted model.
 - Then we do cross_val_score with reported hyperparams (There doesn't appear to be a way to extract the score from the fitted model without refitting)
 - Verbose output reports 130 tasks, for full grid search on 10 folds expect 13x9x10=1170. Clever optimization?
 - Note the modest reduction in RMSE vs. linear regression without regularization.

## 8. GridSearchCV

```python
gs = make_pipeline(RobustScaler(),
                   GridSearchCV(ElasticNet(max_iter=100000),
                                param_grid={'l1_ratio': [0.01, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.99],
                                            'alpha': np.logspace(-4, -2, 9),
                                           },
                                scoring='neg_mean_squared_error',
                                refit=True,
                                cv=kfolds,
                                n_jobs=-1,
                                verbose=1
                               ))
# use full data set, not train_test_split
gs.fit(df[predictors], df[response])
print('best params', gs._final_estimator.best_params_)
print('best score', -gs._final_estimator.best_score_)
l1_ratio = gs._final_estimator.best_params_['l1_ratio']
alpha = gs._final_estimator.best_params_['alpha']

elasticnet = ElasticNet(alpha=alpha,
                        l1_ratio=l1_ratio,
                        max_iter=100000)
print(elasticnet)

scores = -cross_val_score(elasticnet, df[predictors], df[response],
                          scoring="neg_root_mean_squared_error",
                          cv=kfolds,
                          n_jobs=-1)
raw_scores = [cv_to_raw(x) for x in scores]

print("Raw CV RMSE %.06f (STD %.04f)" % (np.mean(raw_scores), np.std(raw_scores)))
```

```
best params {'alpha': 0.0031622776601683794, 'l1_ratio': 0.01}
best score 0.010637685614240404
ElasticNet(alpha=0.0031622776601683794, l1_ratio=0.01, max_iter=100000)

Raw CV RMSE 18061 (STD 2008)
Wall time: 4.64 s

```

### Notes

- GridSearchCV verbose output shows 1170 jobs, which is the expected number 13x9x10.
- We can run on full data set and extract the best hyperparameters found (using the average metric over all folds)
- Identical result, runs a little slower


## 9. XGBoost with manual sequential grid search

XGBoost has many tuning parameters so a complete grid search has an unreasonable number of combinations. We tune reduced sets sequentially and use early stopping.

### Tuning methodology
- Set an initial set of starting parameters.
- Tune sequentially on groups of hyperparameters that don't interact too much between groups to reduce combinations.
- First, tune max_depth
- Then tune subsample, colsample_bytree and colsample_bylevel
- Finally, tune learning rate: lower learning rate will need more boosting rounds (n_estimators)
- Do 10-fold CV on each hyperparameter combination
- Use early stopping to halt training in each fold if no improvement after 100 rounds
- Pick hyperparameters to minimize average RMSE over kfolds
- After choosing hyperparameters, retrain and evaluate on full dataset without early stopping.

It doesn't seem possible to get XGBoost early stopping and also use GridSearchCV. GridSearchCV doesn't pass the kfolds in a way that XGboost understands for early stopping. Alternative approaches:

- Use native xgboost .cv which understands early stopping but doesn't use sklearn API (uses DMatrix, not numpy array or dataframe)
- Use sklearn API and roll our own grid search instead of GridSearchCV (used below)

```python
# initial hyperparams
max_depth = 5
min_child_weight=5
colsample_bytree = 0.5
subsample = 0.5
reg_alpha = 1e-05
reg_lambda = 1
reg_gamma = 0
learning_rate = 0.01

BOOST_ROUNDS=50000   # we use early stopping so make this arbitrarily high
EARLY_STOPPING_ROUNDS=100 # stop if no improvement after 100 rounds

# round 1: tune depth and min_child_weight
max_depths = list(range(1,5))
min_child_weights = list(range(1,5))
gridsearch_params_1 = product(max_depths, min_child_weights)

# round 2: tune subsample and colsample_bytree
subsamples = np.linspace(0.1, 1.0, 10)
colsample_bytrees = np.linspace(0.1, 1.0, 10)
gridsearch_params_2 = product(subsamples, colsample_bytrees)

# round 2 (refined): tune subsample and colsample_bytree
subsamples = np.linspace(0.4, 0.8, 9)
colsample_bytrees = np.linspace(0.05, 0.25, 5)
gridsearch_params_2 = product(subsamples, colsample_bytrees)

# round 3: tune alpha, lambda, gamma
reg_alphas = np.logspace(-3, -2, 3)
reg_lambdas = np.logspace(-2, 1, 4)
reg_gammas = [0]
#reg_gammas = np.linspace(0, 5, 6)
gridsearch_params_3 = product(reg_alphas, reg_lambdas, reg_gammas)

# round 4: learning rate
learning_rates = reversed(np.logspace(-3, -1, 5).tolist())
gridsearch_params_4 = learning_rates

# TODO: remove these overrides to reset the search
# override initial parameters after search
# round 1:
max_depth=2
min_child_weight=2
# # round 2:
subsample=0.60
colsample_bytree=0.05
# # round 3:  
reg_alpha = 0.003162
reg_lambda = 0.1
reg_gamma = 0

def my_cv(df, predictors, response, kfolds, regressor, verbose=False):
    """Roll our own CV over kfolds with early stopping"""
    metrics = []
    best_iterations = []

    for train_fold, cv_fold in kfolds.split(df): 
        fold_X_train=df[predictors].values[train_fold]
        fold_y_train=df[response].values[train_fold]
        fold_X_test=df[predictors].values[cv_fold]
        fold_y_test=df[response].values[cv_fold]
        regressor.fit(fold_X_train, fold_y_train,
                      early_stopping_rounds=EARLY_STOPPING_ROUNDS,
                      eval_set=[(fold_X_test, fold_y_test)],
                      eval_metric='rmse',
                      verbose=verbose
                     )
        y_pred_test=regressor.predict(fold_X_test)
        metrics.append(np.sqrt(mean_squared_error(fold_y_test, y_pred_test)))
        best_iterations.append(xgb.best_iteration)
    return np.average(metrics), np.std(metrics), np.average(best_iterations)

results = []
best_iterations = []

# TODO: iteratively uncomment 1 of the following 4 lines
# for i, (max_depth, min_child_weight) in enumerate(gridsearch_params_1): # round 1
# for i, (subsample, colsample_bytree) in enumerate(gridsearch_params_2): # round 2
# for i, (reg_alpha, reg_lambda, reg_gamma) in enumerate(gridsearch_params_3): # round 3
for i, learning_rate in enumerate(gridsearch_params_4): # round 4

    params = {
        'max_depth': max_depth,
        'min_child_weight': min_child_weight,
        'subsample': subsample,
        'colsample_bytree': colsample_bytree,
        'reg_alpha': reg_alpha,
        'reg_lambda': reg_lambda,
        'gamma': reg_gamma,
        'learning_rate': learning_rate,
    }
    print("%s params  %3d: %s" % (datetime.strftime(datetime.now(), "%T"), i, params))
    xgb = XGBRegressor(
        objective='reg:squarederror',
        n_estimators=BOOST_ROUNDS,
        early_stopping_rounds=EARLY_STOPPING_ROUNDS,
        random_state=RANDOMSTATE,    
        verbosity=1,
        n_jobs=-1,
        booster='gbtree',   
        base_score=0.5, 
        scale_pos_weight=1,      
        **params
    )
    
    metric_rmse, metric_std, best_iteration = my_cv(df, predictors, response, kfolds, xgb, verbose=False)    
    results.append([max_depth, min_child_weight, subsample, colsample_bytree, reg_alpha, reg_lambda, reg_gamma, 
                   learning_rate, metric_rmse, metric_std, best_iteration])
    
    print("%s %3d result mean: %.6f std: %.6f, iter: %.2f" % (datetime.strftime(datetime.now(), "%T"), i, metric_rmse, metric_std, best_iteration))


results_df = pd.DataFrame(results, columns=['max_depth', 'min_child_weight', 'subsample', 'colsample_bytree', 
                               'reg_alpha', 'reg_lambda', 'reg_gamma', 'learning_rate', 'rmse', 'std', 'best_iter']).sort_values('rmse')
results_df

```

We run this cell 4 times, each time overriding the initial hyperparameters with the best values found.

The total training duration, sum of the 4 times is 36:09.

Then we refit using the best hyperparameters and evaluate:

```python
# CV and evaluate with best params and without early stopping

xgb = XGBRegressor(
    objective='reg:squarederror',
    random_state=RANDOMSTATE,    
    verbosity=1,
    n_jobs=-1,
    booster='gbtree',   
    base_score=0.5, 
    scale_pos_weight=1,        
    **params
)
print(xgb)

scores = -cross_val_score(xgb, df[predictors], df[response],
                          scoring="neg_root_mean_squared_error",
                          cv=kfolds,
                          n_jobs=-1)
raw_scores = [cv_to_raw(x) for x in scores]
print()
print("Log1p CV RMSE %.06f (STD %.04f)" % (np.mean(scores), np.std(scores)))
print("Raw CV RMSE %.0f (STD %.0f)" % (np.mean(raw_scores), np.std(raw_scores)))
```

```Raw CV RMSE 18783 (STD 2307)```

## 10. XGBoost with HyperOpt, Optuna, and Ray

The steps to run a Ray tuning job with HyperOpt are:

1. Set up a Ray search space with a config dict 
2. Refactor the training job into a function which takes the config dict as an argument and calls `tune.report(rmse=rmse)` to optimize a metric like RMSE.

Call `ray.tune` with the `config` and a `num_samples` argument

Set up the Ray search space:

```python
xgb_tune_kwargs = {
    "n_estimators": tune.loguniform(100, 10000),
    "max_depth": tune.randint(0, 5),
    'max_leaves': tune.loguniform(1, 1000),    
    "subsample": tune.quniform(0.25, 0.75, 0.01),
    "colsample_bytree": tune.quniform(0.05, 0.5, 0.01),
    "colsample_bylevel": tune.quniform(0.05, 0.5, 0.01),    
    "learning_rate": tune.loguniform(0.001, 0.1),
}
```

discuss ASHA

Set up the training function. Note that some search algos expect all hyperparams to be floats and search intervals to start at 0. So we convert params as necessary.

```python
def my_xgb(config):
    
    # fix these configs to match calling convention
    config['max_depth'] = int(config['max_depth']) + 2   # hyperopt needs left to start at 0 but we want to start at 2
    config['max_leaves'] = int(config['max_leaves'])
    config['n_estimators'] = int(config['n_estimators'])   # pass float eg loguniform distribution, use int
    
    xgb = XGBRegressor(
        objective='reg:squarederror',
        n_jobs=1,
        random_state=RANDOMSTATE,
        booster='gbtree',   
        scale_pos_weight=1, 
        **config,
    )
    scores = np.sqrt(-cross_val_score(xgb, df[predictors], df[response],
                                      scoring="neg_mean_squared_error",
                                      cv=kfolds))
    rmse = np.mean(scores)
    tune.report(rmse=rmse)
    # wandb.log({"rmse": rmse})
    
    return {"rmse": rmse}

```

Run Ray

```python
algo = HyperOptSearch(random_state_seed=RANDOMSTATE)
scheduler = AsyncHyperBandScheduler()

analysis = tune.run(my_xgb,
                    num_samples=NUM_SAMPLES,
                    config=xgb_tune_kwargs,                    
                    name="hyperopt_xgb",
                    metric="rmse",
                    mode="min",
                    search_alg=algo,
                    scheduler=scheduler,
                    verbose=1,
                   )
```

- Time to run: 53:27. We extract the best hyperparameters and do 

  ```python
  best_config = {
      'max_depth': max_depth,
      'min_child_weight': min_child_weight,
      'subsample': subsample,
      'colsample_bytree': colsample_bytree,
      'reg_alpha': reg_alpha,
      'reg_lambda': reg_lambda,
      'gamma': reg_gamma,
      'learning_rate': learning_rate,
      'n_estimators':  N_ESTIMATORS
  }
  
  xgb = XGBRegressor(
      objective='reg:squarederror',
      random_state=RANDOMSTATE,    
      verbosity=1,
      n_jobs=-1,
      **best_config
  )
  print(xgb)
  
  scores = -cross_val_score(xgb, df[predictors], df[response],
                            scoring="neg_root_mean_squared_error",
                            cv=kfolds)
  
  raw_scores = [cv_to_raw(x) for x in scores]
  print()
  print("Log1p CV RMSE %.06f (STD %.04f)" % (np.mean(scores), np.std(scores)))
  print("Raw CV RMSE %.0f (STD %.0f)" % (np.mean(raw_scores), np.std(raw_scores)))
  ```

  ```python
  Raw CV RMSE 18770.443039 (STD 2229.3542)
  ```

- We can swap HyperOpt for Optuna as simply as:

  ```python
  algo = OptunaSearch()
  ```

## 11. LightGBM with HyperOpt and Optuna

We can swap XGBoost for LightGBM by providing a new function to optimize:

```python
def my_lgbm(config):
    
    # fix these configs 
    config['n_estimators'] = int(config['n_estimators'])   # pass float eg loguniform distribution, use int
    config['num_leaves'] = 2 + int(config['num_leaves'])
    
    lgbm = LGBMRegressor(objective='regression',
                         num_leaves=config['num_leaves'],
                         learning_rate=config['learning_rate'],
                         n_estimators=config['n_estimators'],
                         max_bin=200,
                         bagging_fraction=config['bagging_fraction'],
                         feature_fraction=config['feature_fraction'],
                         feature_fraction_seed=7,
                         min_data_in_leaf=2,
                         verbose=-1,
                         # early stopping params, maybe in fit
                         #early_stopping_rounds=early_stopping_rounds,
                         #valid_sets=[xgtrain, xgvalid], valid_names=['train','valid'], evals_result=evals_results
                         #num_boost_round=num_boost_round,
                         )
    
    scores = np.sqrt(-cross_val_score(lgbm, df[predictors], df[response],
                                      scoring="neg_mean_squared_error",
                                      cv=kfolds))
    tune.report(mse=np.mean(scores))
    return {'mse': np.mean(scores)}

```

and run as before:

```python
analysis = tune.run(my_xgb,
                    name="xgb_hyperopt",
                    metric="mse",
                    mode="min",
                    search_alg=algo,
                    scheduler=scheduler,
                    verbose=1, 
                    raise_on_failed_trial=False, # otherwise no reults df returned if any trial error
                    loggers=DEFAULT_LOGGERS + (WandbLogger, ),
                    **tune_kwargs)
```

results

## 12. XGBoost on Ray cluster with Optuna

- Clusters are defined in `ray1.1.yaml`. (So far we have been using the current production ray 1.0, but I had difficulty getting cluster to run with ray 1.0 so I switched to the dev nightly.)
- boto3 and AWS CLI configured credentials are used, so [install and configure AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- Edit `ray1.1.yaml` file with your region, availability zone, subnet, imageid information
    - to get those variables launch the latest Deep Learning AMI (Ubuntu 18.04) Version 35.0 into a small instance in your favorite region/zone
    - test that it works
    - note those 4 variables: region, availability zone, subnet, AMI imageid
    - terminate the instance and edit `ray1.1.yaml` accordingly
    - in future you can create your own image with everything pre-installed and specify its AMI imageid, instead of using the generic image and installing everything at launch.
- To run the cluster: 
`ray up ray1.1.yaml`
    - Creates head instance using image specified.
    - Installs ray and related requirements
    - Clones this Iowa repo
    - Launches worker nodes per auto-scaling parameters (currently we fix the number of nodes because we're not benchmarking the time the cluster will take to auto-scale)
- After cluster starts you can check AWS console and note that several instances launched.
- Check `ray monitor ray1.1.yaml` for any error messages
- Run Jupyter on the cluster with port forwarding
 `ray exec ray1.1.yaml --port-forward=8899 'source ~/anaconda3/bin/activate tensorflow_p36 && jupyter notebook --port=8899'`
- Open the notebook on the generated URL e.g. http://localhost:8899/?token=5f46d4355ae7174524ba71f30ef3f0633a20b19a204b93b4
- Make sure to choose the default kernel to make sure it runs in the conda environment with all installs
- Make sure to use the ray.init() command given in the startup messages.
   ```ray.init(address='localhost:6379', _redis_password='5241590000000000')```
- You can also run a terminal on the head node of the cluster with
 `ray attach /Users/drucev/projects/iowa/ray1.1.yaml`
- You can also ssh explicitly with the IP address and the generated private key
 `ssh -o IdentitiesOnly=yes -i ~/.ssh/ray-autoscaler_1_us-east-1.pem ubuntu@54.161.200.54`
- run port forwarding to the Ray dashboard with   
`ray dashboard ray1.1.yaml`
and then open
 http://localhost:8265/
- the cluster will incur AWS charges so `ray down ray1.1.yaml` when complete
- Other than connecting to Ray cluster, runs identically to previous examples.
- See [hyperparameter_optimization_cluster.ipynb](https://github.com/druce/iowa/hyperparameter_optimization_cluster.ipynb), separated out so each notebook can be run end-to-end with/without cluster setup
- See https://docs.ray.io/en/latest/cluster/launcher.html for additional info on Ray clusters.

No other change to code to run on the cluster

```python
analysis = tune.run(my_xgb,
                    name="xgb_hyperopt",
                    metric="mse",
                    mode="min",
                    search_alg=algo,
                    scheduler=scheduler,
                    verbose=1, 
                    raise_on_failed_trial=False, # otherwise no reults df returned if any trial error
                    loggers=DEFAULT_LOGGERS + (WandbLogger, ),
                    **tune_kwargs)
```

Results

## 13. LightGBM on Ray cluster with Optuna

again, just swap out my_xgb for my_lgbm

Results

## 14. Concluding remarks

Bayesian optimization tunes significantly faster with a less manual process vs. sequential tuning. The RMSE is slightly worse in this case. 

In almost every case I've applied them, HyperOpt has given me at least a small improvement in the best metrics I found using grid search methods. Additionally, it's fire and forget.

Is the Ray framework the way to go for hyperparameter tuning? Provisionally, yes. What we really need and Ray provides here is good integration between the underlying ML (e.g. XGBoost), the Bayesian search (e.g. HyperOpt), and early stopping (ASHA). I need to do a little more work and understand what performance benefits HyperOpt and Optuna offer without Ray. 

Clusters? Most of the time I don't have the need, costs add up, The longest run I have tried, with 4096 samples, ran overnight on desktop. My MacBook Pro w/16 threads and desktop with 12 threads and GPU are plenty powerful. But it's good to have the clustering alternative in the back pocket. In production it might be more maintainable to deploy with Terraform, Kubernetes than Ray native YAML config interface.

It continues to surprise me that Elasticnet, i.e. regularized linear regression, outperforms boosting on this dataset. I heavily engineered features so that linear methods work well. Predictors were chosen using Lasso/Elasticnet and I used log and Box-Cox transforms to force predictors to follow assumptions of least-squares.

This may tend to validate one of the [critiques of machine learning](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3624052), that the most powerful ML methods don't necessarily converge all the way to the best solution. If you have a ground truth that is linear plus noise, a complex XGBoost or neural network algorithm should get arbitrarily close to the closed-form optimal solution, but will never match the optimal solution exactly. XGBoost is piecewise constant and the complex neural network is subject to the vagaries of stochastic gradient descent. I thought arbitrarily close meant almost indistinguishable but clearly here this is not quite the case.

Elasticnet with L1 + L2 regularization plus gradient descent and hyperparameter optimization is still machine learning. It's simply the form of ML best matched to the problem. In the real world where data doesn't match assumptions of least-squares, gradient boosting generally performs extremely well. And even on this dataset, engineered for the linear models, SVR and KernelRidge performed better than Elasticnet (not shown) and ensembling Elasticnet with XGBoost, LightGBM, SVR, neural networks worked best of all. 

To paraphrase Casey Stengel, clever feature engineering will always outperform clever model algorithms and vice-versa<sup>*</sup>. But improving your hyperparameters with these best practices will always improve your results.

<sup>*</sup>This is not intended to make sense.



#### Todo:

fix the Jekyll template and validate html

fix top links and header color

fix bottom copyright
