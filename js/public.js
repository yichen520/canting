/**
 * 图片预览
 * 
 */

function setImagePreview() {
	var docObj = document.getElementById("myfile");

	var imgObjPreview = document.getElementById("preview");
	if (docObj.files && docObj.files[0]) {
		// 火狐下，直接设img属性
		//imgObjPreview.style.display = 'block';
		//imgObjPreview.style.width = '100px';
		//imgObjPreview.style.height = '100px';
		// imgObjPreview.src = docObj.files[0].getAsDataURL();
		// 火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
		imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
	} else {
		// IE下，使用滤镜
		docObj.select();
		var imgSrc = document.selection.createRange().text;
		var localImagId = document.getElementById("imgviewbox");
		// 必须设置初始大小
		localImagId.style.width = "100px";
		localImagId.style.height = "100px";
		// 图片异常的捕捉，防止用户修改后缀来伪造图片
		try {
			localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
			localImagId.filters
					.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
		} catch (e) {
			alert("您上传的图片格式不正确，请重新选择!");
			return false;
		}
		imgObjPreview.style.display = 'none';
		document.selection.empty();
	}
	return true;
}


$(function(){
	//图片预览
	$("#myfile").change(function(){
		var file = $(this).val();
		//获取文件的后缀名
		var exd = file.substring(file.lastIndexOf(".")+1);
		//定义文件的格式类型
		var arr =["png","gif","jpg","jpeg"];
		var istrue = false;
		for(var i=0;i<arr.length;i++){
			if(exd==arr[i])
				istrue = true;
		}
		if(!istrue){
			alert("上传的文件必须是：png,gif,jpg,jpeg格式,请重新选择！");
			$(this).val("");
			return;
		}
		setImagePreview();//图片预览
	});
});


