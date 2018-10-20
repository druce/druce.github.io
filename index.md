This is tutorial on running Jupyter Notebook on an Amazon EC2 instance. It is based on a [tutorial](https://chrisalbon.com/software_engineering/cloud_computing/run_project_jupyter_on_amazon_ec2/) by Chris Albon which did not work for me immediately (itself based on a [tutorial by Piyush Agarwal](http://blog.impiyush.me/2015/02/running-ipython-notebook-server-on-aws.html)), but I tweaked a few things and got it working.

Use cases for AWS (who doesn't love AWS?)

- Scale up - get a giant instance that runs faster than your PC
- Scale out - run many notebooks as once
- Access resources you don't have, don't want to install on local PC: GPU, Postgres
- Everybody in industry uses it

1) set up AWS account - I won't go over that. But 2 recommendations:

- Set up 2-factor authentication. Who hasn't had a password compromised? With 2FA if your AWS password gets compromised, you don't lose everything in your account, and have someone run up a huge bill mining Bitcoin or spamming the world.
  - Either use the [Google Authenticator](https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8) smartphone app
  - Or a hardware key like [Yubikey](http://www.1strategy.com/blog/2018/05/08/lock-down-your-aws-account-with-yubikey/) which doesn't depend on having your phone, Internet access.
- Set up [billing alerts](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html)

2) Create an instance

- Log into the [AWS console](https://console.aws.amazon.com/) 
- Click on "EC2"
- Click on "Launch instance"
- Choose an Amazon Machine Image (AMI)
  - We are going to use Ubuntu 18.04 LTS. 
  - In general, choose latest Ubuntu LTS (Long Term Support), HVM virtualization, SSD storage. (Exception: when the latest Ubuntu is very new, give it ~6 months to mature, ensure all software, especially drivers are available and tested, e.g. GPU)
- Choose an instance type, click "Next: Configure Instance Details": for this demo choose the free tier eligible micro instance
- Choose "Next: Add Storage" (Shouldn't have to modify anything on this page)
- Set a reasonable amount of storage, like 30GB (maybe more if you have a big dataset or something). Click "Next: Add Tags"
- Click "Next: Configure Security Group" (You don't need to modify anything on this page. Tags help you keep track of servers and other resources if you have a lot of them)
- Create a new security group like 'Jupyter'.
- Click "Add rule"
  - Set Type: All TCP
  - Set Source: My IP
  - Click the x at far right to delete the first rule
  - (In other words: allow all access from my IP, no access from anywhere else (default was SSH from anywhere)
- Click "Review and Launch"
- Click "Launch"
- Almost there! 
- Choose "Create key pair"
- Give it a name like "mykey" or "AWS"
- Click "Download key pair"
- Click "Launch instance"
- You now have a running AWS instance!

3) Connect to instance

- Remember that "AWS.pem" file you downloaded? Find it and move it to your home directory or any directory
- Open a console, terminal, command prompt on your local PC
- cd to your home directory
- Move the downloaded key there
- Change its permissions so no one else can access it
- By now your instance should have launched. To find the IP address to connect to, go back to your [AWS console](https://console.aws.amazon.com/ec2/v2/#Instances)
- Click on the instance - hover over "IPv4 Public IP" and click on the copy icon (or the Public DNS, doesn't really matter)
- Go back to your terminal and run ssh command (copy the IP or hostname)
- If you see a bash command prompt, you are in business! 

4) Now we have an AWS instance, update it and install Jupyter and the data science toolkit

- Get ubuntu updates

- ~~~ubuntu@ip-172-30-3-209:~ sudo apt update
  ubuntu@ip-172-30-3-209:~ sudo apt upgrade
  ~~~  
  if prompted, choose 'keep local version', tab to OK, hit enter
  it will run for a while
  if you do sudo apt upgrade again you will see this, meaning it is fully updated
  ~~~
  ubuntu@ip-172-30-3-209:~$ sudo apt upgrade
  Reading package lists... Done
  Building dependency tree
  Reading state information... Done
  Calculating upgrade... Done
  0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
  ~~~

- Ignore the following if you don't understand it: typically I will explicitly update held-back packages and autoremove, until I see nothing left to update

- Next, download the Anaconda installer: Go to the [install page](https://www.anaconda.com/download/#linux) , right-click on the big button for the 3.7 version and copy link address.

- Go back to the terminal and enter 

  ```{bash}wget <paste url>
  bash ./A<tab to complete>
  ```

<hit enter, spaces to get through all the responses, type yes>
<accept all the defaults>

```{bash}
ubuntu@ip-172-30-3-209:~$ wget https://repo.anaconda.com/archive/Anaconda3-5.3.0-Linux-x86_64.sh
--2018-10-20 16:30:10--  https://repo.anaconda.com/archive/Anaconda3-5.3.0-Linux-x86_64.sh
Resolving repo.anaconda.com (repo.anaconda.com)... 104.17.111.77, 104.17.107.77, 104.17.108.77, ...
Connecting to repo.anaconda.com (repo.anaconda.com)|104.17.111.77|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 667822837 (637M) [application/x-sh]
Saving to: ‘Anaconda3-5.3.0-Linux-x86_64.sh’

Anaconda3-5.3.0-Linux-x86_64.sh                   100%[============================================================================================================>] 636.88M  49.5MB/s    in 11s

2018-10-20 16:30:21 (60.2 MB/s) - ‘Anaconda3-5.3.0-Linux-x86_64.sh’ saved [667822837/667822837]

ubuntu@ip-172-30-3-209:~$ bash ./Anaconda3-5.3.0-Linux-x86_64.sh

Welcome to Anaconda3 5.3.0

In order to continue the installation process, please review the license
agreement.
Please, press ENTER to continue
```

IMPORTANT - when prompted, update .bashrc, RESTART TERMINAL (as it helpfully points out)
installation finished.

```{bash}
Do you wish the installer to initialize Anaconda3
in your /home/ubuntu/.bashrc ? [yes|no][no] >>> yes

Initializing Anaconda3 in /home/ubuntu/.bashrc
A backup will be made to: /home/ubuntu/.bashrc-anaconda3.bak

For this change to become active, you have to open a new terminal.

Thank you for installing Anaconda3!

Do you wish to proceed with the installation of Microsoft VSCode? [yes|no]
no
```
- ctrl-D to exit terminal
- up-arrow to repeat last ssh command

```{bash}ubuntu@ip-172-30-3-209:~$ logout
Connection to 18.234.158.61 closed.
MacBook-Pro-8:~ druce$ ssh -i AWS.pem ubuntu@18.234.158.61
```

- run python, you should see 3.7, Anaconda build
  ubuntu@ip-172-30-3-209:~$ python
  Python 3.7.0 (default, Jun 28 2018, 13:15:42)
  [GCC 7.2.0] :: Anaconda, Inc. on linux
  Type "help", "copyright", "credits" or "license" for more information.

- ctrl-D to exit

Almost there! Let's update Anaconda
```ubuntu@ip-172-30-3-209:~$ conda update --all
Solving environment: \
```

- many updates later
```{bash}bleach-3.0.2         | 219 KB    | ############################################################################################################################################################ | 100%
  Preparing transaction: done
  Verifying transaction: done
  Executing transaction: done
  (base) ubuntu@ip-172-30-3-209:~$
```
- Now you have a running Amazon instance, updated, with Anaconda installed and updated.

5) Now we configure and run jupyter

- create a certificate to access your jupyter notebooks via https (I just hit enter for all the values requested)

```{bash}
(base) ubuntu@ip-172-30-3-209:~/.jupyter$ cd
(base) ubuntu@ip-172-30-3-209:~$ mkdir certs
(base) ubuntu@ip-172-30-3-209:~$ cd certs
(base) ubuntu@ip-172-30-3-209:~/certs$ openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout mycert.pem -out mycert.pem
Generating a 1024 bit RSA private key
...++++++
....++++++

## writing new private key to 'mycert.pem'

You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,

## If you enter '.', the field will be left blank.

Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:
Email Address []:
```

- create jupyter config and password

```{bash}(base) ubuntu@ip-172-30-3-209:~$ jupyter notebook --generate-config
Writing default config to: /home/ubuntu/.jupyter/jupyter_notebook_config.py
(base) ubuntu@ip-172-30-3-209:~$ jupyter notebook password
Enter password:
Verify password:
[NotebookPasswordApp] Wrote hashed password to /home/ubuntu/.jupyter/jupyter_notebook_config.json
(base) ubuntu@ip-172-30-3-209:~$
```
- add these to top of .jupyter_notebook_config.json
```{python}
# Kernel config

c.IPKernelApp.pylab = 'inline'  # if you want plotting support always in your notebook

# Notebook config
c.NotebookApp.allow_remote_access = True
c.NotebookApp.certfile = u'/home/ubuntu/certs/mycert.pem' #location of your certificate file
c.NotebookApp.ip = '*'
c.NotebookApp.open_browser = False  #so that the ipython notebook does not opens up a browser by default
c.NotebookApp.password = u'sha1:98ff0e580111:12798c72623a6eecd54b51c006b1050f0ac1a62d'  #the encrypted password we generated above
# Set the port to 8888, the port we set up in the AWS EC2 set-up
c.NotebookApp.port = 8888
```

-connect
https://18.234.158.61:8888/
ignore the warning and proceed
enter password
you are in business!

6) Final step - image and restart your server. Otherwise you have to do ALL THESE steps to this again to launch another server

Go to AWS console

- Log into the console https://console.aws.amazon.com/ec2/v2/#Instances
- Right-click on your instance, choose Image, Create Image
- Give a good name, I'll usually go with desc-date 
- I don't bother with desc, but you might put 'fresh Ubuntu 18, Anaconda with all updates'
- Click 'create image'
  - Note: this is where you adjust your disk size if you want to increase it (for bigger instances/jobs) or reduce it (save storage)
  - Note: this will restart your instance
- Creating image can take 10-15 mins - go to AMIs and see it running, when it's available. You can reconnect to your server after it boots in a couple of minutes.
- Right-click on image, click Launch instance
- Choose instance type
- Set security group
- Launch - off to the races
- You can connect to it using same IP. You now have 2 identical running instances.

- To terminate it , right-click and choose terminate.

- If you aren't going to use your instance for a while, stop it., and if you have made a lot of changes, maybe image it to have as a backup.

