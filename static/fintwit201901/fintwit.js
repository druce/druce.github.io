var globalsigma;
var globalSearchResults = [];
var globalSearchSaved = [];
var globalEdgeSaved = [];
var globalNodeList = {};
var globalEdgeList;
var forceActivated;

function populateGlobalNodes(list) {
    globalNodeList = {};
    for (i = 0; i < list.length; i++) {
        obj = {};
        obj.label = list[i].label;
        obj.lowerlabel = obj.label.toLowerCase();
        globalNodeList[list[i].id] = obj;
    }
}

function doForce() {
    clearTopicText();
    forceActivated = 1;
    document.getElementById('button1').onclick = doReinit;
    document.getElementById('button1').innerHTML = "Reset Layout";

    globalsigma.settings('drawEdges', false);
    addAllEdges();
    globalsigma.refresh();
    window.globalsigma.startForceAtlas2({ worker: true, barnesHutOptimize: false });
    setTimeout(function () { window.globalsigma.stopForceAtlas2(); }, 3000);
}

function doNothing(event) {
    event.preventDefault();
}

function doReinit() {
    // clear the graph nodes and edges
    s = window.globalsigma;
    s.graph.clear();
    // remove any methods you've attached to s.
    s.kill();
    forceActivated=0;
    var g = document.querySelector('#graphcontainer');
    var p = g.parentNode;
    p.removeChild(g);
    var c = document.createElement('div');
    c.setAttribute('id', 'graphcontainer');
    c.setAttribute('class', 'col-9');
    c.innerHTML = "<div id=\"forcediv\"><a href=\"#\" id=\"button1\" onclick=\"doForce()\">Force Layout</a> <br /></div>";
    p.prepend(c);
    sigma.parsers.json("se_nodes.json",
        { container: 'graphcontainer' },
        reinit
    );
}

function doSearch2(str) {
    globalSearchResults = [];
    str = str.toLowerCase();
    re = RegExp(str);
    nodes = globalsigma.graph.nodes()
    for (var i = 0; i < nodes.length; i++) {
        if (re.test(nodes[i].label.toLowerCase())) {
            globalSearchResults.push(nodes[i]);
            saveobj = { id: i, size: nodes[i].size, color: nodes[i].color };
            globalSearchSaved.push(saveobj);
        }
    }
    for (var i = 0; i < globalSearchResults.length; i++) {
        mynode = globalSearchResults[i];
        mynode.size = 8;
        mynode.color = "#000000";
    }
}

function doSearch(event) {
    event.preventDefault();
    resetSearch();
    retstr = '';
    str = $('#searchinput').val();
    if (2 >= str.length) {
        $('#results').html("<i>You must search for a name with a minimum of 3 letters.</i>");
        return;
    } else {
        $('#results').html("");
    }
    doSearch2(str)
    globalsigma.refresh()
}
document.getElementById('searchbutton').onclick = doSearch;

function resetSearch(event) {
   if (event) {
        event.preventDefault();
        $("#searchinput").val('');
    }
    for (i = 0; i < globalSearchSaved.length; i++) {
        savedvals = globalSearchSaved[i];
        mynode = globalsigma.graph.nodes()[savedvals.id];
        mynode.size = savedvals.size;
        mynode.color = savedvals.color
    }
    globalSearchSaved = [];
    globalsigma.refresh()
}
document.getElementById('resetbutton').onclick = resetSearch;

function searchkey(event) {
    if (event.keyCode === 13) { // return key
        $("#searchbutton").click();
    }
    else {
        resetSearch();
        str = $('#searchinput').val();
        if (2 < str.length) {
            doSearch2(str);
            globalsigma.refresh()
        }
    }    
}
$("#searchinput").keyup(searchkey);

function addAllEdges() {
    for (i=0; i < globalEdgeList.length; i++) {
        edge = globalEdgeList[i];
        globalsigma.graph.addEdge({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            color: '#eee',
            type: "arrow"
          });        
    }
}

function dropAllEdges() {
    edges = globalsigma.graph.edges();
    for (i=0; i < edges.length; i++) {
        edge = edges[i];
        globalsigma.graph.dropEdge(edge.id);
    }
    globalsigma.refresh();
}

function edgesText(node) {
    node_id = node.id;
    follows = {};
    followed_by = {};
    follows_str = '';
    followed_by_str = '';
    both_str = '';

    alledges = globalsigma.graph.edges();
    for (i = 0; i < alledges.length; i++) {
        e = alledges[i];
        if (e.source == node_id)
            follows[e.target] = 1
        if (e.target == node_id)
            followed_by[e.source] = 1
    }
    var keys = Object.keys(followed_by);
    for (i = 0; i < keys.length; i++) {
        followed_by_id = followed_by[keys[i]];
        if (followed_by_id in follows)
            both_str += followed_by_id;
        else
            followed_by_str += followed_by_id;
    }
    for (i = 0; i < sources.length; i++) {
        e = sources[i];
        e.color = '#0000cc';
        e.size = 2;
        e["read_cam0:size"] = 2;
    }

    globalsigma.refresh();
}

function highlightFollowers(node) {
    dropAllEdges();
    globalsigma.settings('edgeColor', 'source');

    node_id = node.id;
    sources = [];
    targets = [];
    both = [];
    alledges = globalEdgeList;
    // should be obj
    // set source[id]=1
    // after setting up both, set up both[id]=1
    // draw both
    // draw source if not in both
    // draw dest if not in both

    for (i = 0; i < alledges.length; i++) {
        e = alledges[i];
        // if (e.source == node_id)
        //     sources.push(e)
        if (e.target == node_id)
            targets.push(e)
    }

    for (i = 0; i < targets.length; i++) {
        edge = targets[i];
        globalsigma.graph.addEdge({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            size: 1,
            // color: 'source',
            type: "arrow"
        }
        );
    }
    
    globalsigma.refresh();
}

function highlightFollowing(node) {
    dropAllEdges();
    globalsigma.settings('edgeColor', 'target');

    node_id = node.id;
    sources = [];
    targets = [];
    both = [];
    alledges = globalEdgeList;
    // should be obj
    // set source[id]=1
    // after setting up both, set up both[id]=1
    // draw both
    // draw source if not in both
    // draw dest if not in both

    for (i = 0; i < alledges.length; i++) {
        e = alledges[i];
        if (e.source == node_id)
            sources.push(e)
        // if (e.target == node_id)
        //     targets.push(e)
    }

    for (i = 0; i < sources.length; i++) {
        edge = sources[i];
        globalsigma.graph.addEdge({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            // color: 'ccc',
            type: "arrow"
        }
        );
    }

    globalsigma.refresh();
}

function clearTopicText() {
    var p = document.getElementsByClassName('topiclabel');
    while (p[0]) {
        p[0].parentNode.removeChild(p[0]);
    }
    p = document.getElementsByClassName('topics');
    while (p[0]) {
        p[0].parentNode.removeChild(p[0]);
    }
}

function topicText() {
    var p = document.querySelector('#graphcontainer');
    var c = document.createElement('div');
    c.setAttribute('class', 'topics');

    htmlstr = "<div class=\"topiclabel\"  style=\"left:400px; top:230px; color:#412FBF\">Policy</div>";
    //		htmlstr += "<div class=\"topiclabel\"  style=\"left:575px; top:200px;\">Macro/Fed</div>";
    //		htmlstr += "<div class=\"topiclabel\"  style=\"left:575px; top:200px;\">Asia</div>";
    htmlstr += "<div class=\"topiclabel\"  style=\"left:525px; top:375px; color:#BF652F\">Europe</div>";
    htmlstr += "<div class=\"topiclabel\"  style=\"left:500px; top:300px; color:#AD2FBF\">Tech/Media</div>";
    htmlstr += "<div class=\"topiclabel\"  style=\"left:350px; top:400px; color:#2FBF53\">US Markets</div>";

    c.innerHTML = htmlstr;
    p.prepend(c);
}

function webhover_in() {
    imgsrc = "thumb/" + window.clicknode.label + "_thumb.png";
    $("#webimg").attr("src",imgsrc);
    $('#webhover').show();
    console.log(imgsrc);
}
function webhover_out() {
    $('#webhover').hide();
}

function follow_in() {
    currentnode = window.clicknode
    $("#followtitle").html("&nbsp; <br/>&nbsp; <br/> " + currentnode.attributes.Name + " follows:");
    retstr = "<br \>";
    for (i = 0; i < globalEdgeList.length; i++) {
        e = globalEdgeList[i];
        if (e.source == currentnode.id) {
            retstr += globalNodeList[e.target].label;
            retstr += " "
        }
    }
    $("#followtext").html(retstr)
    $('#follow').show();
    if (forceActivated==0) {highlightFollowing(currentnode);}
}
function follow_out() {
    $('#follow').hide();
    if (forceActivated==0) {dropAllEdges();}
    
}

function followed_in() {
    currentnode = window.clicknode
    $("#followedtitle").html("&nbsp; <br/>&nbsp; <br/>" + currentnode.attributes.Name + " is followed by:");
    retstr = "<br \>";
    for (i = 0; i < globalEdgeList.length; i++) {
        e = globalEdgeList[i];
        if (e.target == currentnode.id) {
            retstr += globalNodeList[e.source].label;
            retstr += " "
        }
    }
    $("#followedtext").html(retstr)
    $('#followed').show();
    if (forceActivated==0) {highlightFollowers(currentnode);}

}
function followed_out() {
    $('#followed').hide();
    if (forceActivated==0) {dropAllEdges();}
}

function wchover_in() {
    imgsrc = "wordcloud/" + window.clicknode.label + ".png";
    $("#wctitle").html("&nbsp; <br/>&nbsp; <br/> &nbsp; " + window.clicknode.attributes.Name + " Word Cloud");
    $("#wcimg").attr("src",imgsrc);
    $('#wchover').show();
    console.log(imgsrc);
}

function wchover_out() {
    $('#wchover').hide();
}

function reinit(s) {
    window.globalsigma = s;
    forceActivated=0;
    s.settings('drawEdges', true);
    s.settings('verbose', true);
    s.settings('defaultEdgeColor', '#ccc');
    //		s.settings('defaultNodeColor', '#903');
    s.settings('defaultLabelSize', '8');
    s.settings('maxNodeSize', 10);
    s.settings('autoRescale', ['nodePosition', 'edgeSize']);
    s.settings('minEdgeSize', 0.0);
    s.settings('maxEdgeSize', 1);
    s.settings('labelThreshold', 0);
    //		s.settings('defaultLabelColor', '#900');
    //		s.settings('defaultLabelBGColor', '#ddd');
    s.settings('drawNodes', true);
    s.settings('batchEdgesDrawing', true);
    s.settings('labelColor', 'node');
    s.settings('edgeColor', 'source');
    s.settings('zoomMin', 1);
    s.settings('zoomMax', 1);
    s.bind('clickNode', function (event) { console.log(event); });
    s.unbind('overNode');
    s.unbind('outNode');
    s.bind('overNode outNode clickNode doubleClickNode rightClickNode', function (e) {
        console.log(e.type, e.data.node.label, e.data.captor);
    });

    s.bind('overNode', function (e) {
        clicknode = e.data.node;
        window.clicknode = clicknode;
        var left = e['data']['node']['renderer1:x'];
        var top = e['data']['node']['renderer1:y'];
        attrs = clicknode.attributes;
        tmpstr = "";
        tmpstr += "<span class=\"tweepName\">" + attrs.Name;
        tmpstr += " <a href=\"https://twitter.com/intent/follow?original_referer=http%3A%2F%2Fwww.streeteye.com%2Fleaderboard&amp;region=follow_link&amp;screen_name=" + clicknode.label + "&amp;source=followbutton&amp;variant=2.0\" target=\"_blank\" title=\"Follow on Twitter\"><img src=\"twitter-bird-16x16.png\" width=16 height=16 class=\"tbirdie\" alt=\"follow\"></a></td>"
        tmpstr += "</span> <br />";
        tmpstr += "<b><a href=\"https://twitter.com/" + clicknode.label + "\" target=\"_blank\" title=\"Follow on Twitter\">" + clicknode.label + "</a>";
        tmpstr += "</b><br />";
        tmpstr += "<div><div style=\"float: left; padding: 5px; style=\"height: 100%; top: 50%; \"><img src=\"twitter_profile_img/" + attrs["twitter_thumb"] + "\"></div><div style=\"height: 100%; top: 50%; padding: 5px;\">";

        tmpstr += attrs.Description;
        loc = attrs["Location"];
        if (loc != 'undefined') {
            if (loc.length > 0) {
                tmpstr +=  "<br /> Location: " + attrs.Location + "." ;
            }
        }
        if (attrs["Joined"] != 'undefined') {
            tmpstr += " On Twitter since: " + attrs["Joined"] + ".";
        }
        tmpstr += "</div></div>";
        if (attrs.Website != null) {
            tmpstr += "<div style=\"clear: left\"><a href=\"" + attrs.Website + "\" id=\"weblink\">🌎 " + attrs.website_title + "</a></div>";
        }
        tmpstr += "<div style=\"clear: left\"><a id=\"wordcloud\" href=\"#\">Word Cloud</a> &nbsp; <br /></div>";
        tmpstr += "<div>3 Most Similar: " + attrs.closest + " &nbsp; <br /></div>";

        tmpstr += "<a href=\"#\" id=\"followedlabel\">Followed by:</a> " + attrs.Followers ;
        tmpstr += "; ";
        tmpstr += "<a href=\"#\" id=\"followlabel\">Follows:</a> " + attrs.Followed ;
        tmpstr += "<br />";

        tmpstr += "Tweets per day: " + attrs.tweets_per_day ;
        tmpstr += "; ";
        tmpstr += "Total Tweets: " + attrs.Tweets;
        tmpstr += "<br />";
        tmpstr += "%Retweet/Quote/Reply: " + attrs.retweet_pct + "% / " + attrs.quote_pct + "% / " + attrs.reply_pct + "% <br /> &nbsp; <br />";

        tmpstr += "% Contain: <br />";
        tmpstr += "<ul><li>Url share: " + attrs.urls_pct + "%";
        if (attrs.top_domain.length > 0) {tmpstr += "; Top: " + attrs.top_domain}
        tmpstr += "</li>";
        tmpstr += "<li>Hashtag: " + attrs.hashtag_pct + "%";
        if (attrs.top_hash.length > 0) {
            tmpstr += "; Top: <a href=\"https://twitter.com/hashtag/" + attrs.top_hash + "\">#";
            tmpstr += attrs.top_hash + "</a>";
        }
        tmpstr += "</li>";
        tmpstr += "<li>Ticker: " + attrs.symbol_pct + "%";
        if (attrs.top_sym.length > 0) {
            tmpstr += "; Top:  <a href=\"https://twitter.com/search?q=%24" + attrs.top_sym + "&src=ctag\">$";
            tmpstr += attrs.top_sym + "</a>";
        }
        tmpstr += "</li>";
        tmpstr += "<li>Mention: " + attrs.media_pct + "%";
        if (attrs.top_mention.length > 0) {
            tmpstr += "; Top:  <a href=\"https://twitter.com/" + attrs.top_mention + "\">@";
            tmpstr += attrs.top_mention + "</a>";
        }
        tmpstr += "</li></ul>";

        tmpstr += "Avg. Engagement per tweet: <br />";
        //			tmpstr += "<ul><li>Replies: "+ attrs.replies_per_tweet + "</li>";
        tmpstr += "<ul><li>Retweets: " + attrs.retweet_per_tweet + "</li>";
        tmpstr += "<li>Likes: " + attrs.favorite_per_tweet + "</li></ul>";

        $('#popover').html(tmpstr);

        $("#weblink").hover(webhover_in, webhover_out);

        $('#followlabel').hover(follow_in, follow_out);
        // $('#followlabel').onclick(doNothing);

        $('#followedlabel').hover(followed_in, followed_out);
        // $('#followedlabel').onclick(doNothing);

        $("#wordcloud").hover(wchover_in, wchover_out);
    
    });
    s.bind('clickStage', function (e) {
    });
    s.refresh();
    topicText();
    populateGlobalNodes(globalsigma.graph.nodes());

    $.getJSON( "se_edges.json", function( data ) {
        globalEdgeList = data.edges;
      });
}

sigma.parsers.json(
    "se_nodes.json",
    { container: 'graphcontainer' },
    reinit
);
