(function(){var e,t;e={load:function(e,t){var n,r,i=this;return r=new XMLHttpRequest,r.open("GET",e),r.responseType="arraybuffer",r.overrideMimeType("text/plain; charset=x-user-defined"),n=!1,r.onload=function(e){if(r.readyState===4&&r.status===200)return t.completed()},r.onprogress=function(e){if(n)return t.progress(e.loaded/e.total*100)},r.send(null),setTimeout(function(){return n=!0},500)},play:function(t){var n,r,i;return n=t.find("canvas"),t=t.find("img"),i=t.data("url"),r=!1,n.show(),n.progressArc({styles:{fgColor:"#ffffff",bgColor:"transparent",strokeWidth:6},data:{start:0}}),t.data("preview")||t.data("preview",t.attr("src")),t.data("playing",!0),e.load(i,{progress:function(e){return n.trigger("setProgress",[e])},completed:function(){if(t.data("playing"))return t.attr("src",i),n.hide()}})},pause:function(e){return e=e.find("img"),e.attr("src",e.data("preview")),e.data("playing",!1),e.find("canvas").hide()},find:function(e){return jQuery(e).closest(".image")}},t={scroll:_.throttle(function(){var e,n,r,i,s,o;s=$(window).scrollTop(),e=$(document).height()-$(window).height(),n=1e3,i=$(".pagination .next a");if(i.length&&s>e-n)return o=i.attr("href"),r=_.once(function(e){return t.refresh(e,o)}),$.get(o,r)},250),refresh:function(e,t){var n;return history.replaceState(null,null,t),n=jQuery(jQuery.parseHTML(e)),n.find("img.lazy").each(function(e,t){return t=jQuery(t),t.attr("src",t.data("original"))}),jQuery("#group-0").append(n.find("#group-0").html()),jQuery("#group-1").append(n.find("#group-1").html()),jQuery("#group-2").append(n.find("#group-2").html()),jQuery(".pagination").replaceWith(n.find(".pagination")),$(".pagination").hide()}},jQuery(function(){return jQuery(document).on("mouseenter",".image-preview",function(t){return e.play(e.find(t.target))}),jQuery(document).on("mouseleave",".image-preview",function(t){return e.pause(e.find(t.target))}),$("a").tipsy({live:!0,gravity:"w",offset:25}),$(window).scroll(t.scroll),t.scroll(),$("img.lazy").lazyload({failure_limit:15}),$(window).trigger("scroll")})}).call(this);