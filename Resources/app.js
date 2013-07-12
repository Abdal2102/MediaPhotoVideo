var win = Ti.UI.createWindow({
	title:"camera and video",
	backgroundColor:"#FFFFFF"
});

var butn = Ti.UI.createButton({
	title:"Hit It!",
	height:36,
	width:100,
	bottom:20,
	left:100,
	zIndex:2
});

win.add(butn);

butn.addEventListener("click", function(e){
	Ti.Media.showCamera({
		success:function(e){
			if(e.mediaType===Ti.Media.MEDIA_TYPE_PHOTO){
				var imgVw = Ti.UI.createImageView({
					media:e.media,
					top:10,
					height:100,
					width:200,
					zIndex:1
				});
				win.add(imgVw);
			}else if(e.mediaType===Ti.Media.MEDIA_TYPE_VIDEO){
				var w = Ti.UI.createWindow({
					title:"VidPlayer",
					backgroundcolor:"#FFFFFF"
				});
				
				var vPlayer = Ti.UI.createVideoPlayer({
					media:e.media
				});
				w.add(vPlayer);
				vPlayer.addEventListener("complete",function(e){
					w.remove(vPlayer);
					vPlayer = null;
					w.close();
				});
			}
		},
		error:function(e){
			alert("error, try again")
		},
		cancel:function(e){
			alert("action was cancelled")
		},
		allowEditing:true,
		mediaType:[Ti.Media.MEDIA_TYPE_PHOTO,Ti.Media.MEDIA_TYPE_VIDEO],
		videoQuality:Ti.Media.HIGH_QUALITY,
		saveToPhoneGallery:true
	})
})

win.open();
