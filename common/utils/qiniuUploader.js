// created by gpake
(function () { function h(a) { a.region ? b.qiniuRegion = a.region : console.error("qiniu uploader need your bucket region"); a.uptoken ? b.qiniuUploadToken = a.uptoken : a.uptokenURL ? b.qiniuUploadTokenURL = a.uptokenURL : a.uptokenFunc && (b.qiniuUploadTokenFunction = a.uptokenFunc); a.domain && (b.qiniuImageURLPrefix = a.domain); b.qiniuShouldUseQiniuFileName = a.shouldUseQiniuFileName } function k(a, d, f, c, e, g) { if (null == b.qiniuUploadToken && 0 < b.qiniuUploadToken.length) console.error("qiniu UploadToken is null, please check the init config or networking"); else { var k = m(b.qiniuRegion), h = a.split("//")[1]; c && c.key && (h = c.key); c = { token: b.qiniuUploadToken }; b.qiniuShouldUseQiniuFileName || (c.key = h); var l = uni.uploadFile({ url: k, filePath: a, name: "file", formData: c, success: function (a) { var c = a.data; a.data.hasOwnProperty("type") && "Buffer" === a.data.type && (c = String.fromCharCode.apply(null, a.data.data)); try { var e = JSON.parse(c); e.imageURL = b.qiniuImageURLPrefix + "/" + e.key; console.log(e); d && d(e) } catch (n) { console.log("parse JSON failed, origin String is: " + c), f && f(n) } }, fail: function (a) { console.error(a); f && f(a) } }); l.onProgressUpdate(function (a) { e && e(a) }); g && g(function () { l.abort() }) } } function p(a) { uni.request({ url: b.qiniuUploadTokenURL, success: function (d) { (d = d.data.uptoken) && 0 < d.length ? (b.qiniuUploadToken = d, a && a()) : console.error("qiniuUploader cannot get your token, please check the uptokenURL or server") }, fail: function (a) { console.error("qiniu UploadToken is null, please check the init config or networking: " + a) } }) } function m(a) { var b = null; switch (a) { case "ECN": b = "https://upload.qiniup.com"; break; case "NCN": b = "https://up-z1.qbox.me"; break; case "SCN": b = "https://up-z2.qbox.me"; break; case "NA": b = "https://up-na0.qbox.me"; break; case "ASG": b = "https://up-as0.qbox.me"; break; default: console.error("please make the region is with one of [ECN, SCN, NCN, NA, ASG]") }return b } var b = { qiniuRegion: "", qiniuImageURLPrefix: "", qiniuUploadToken: "", qiniuUploadTokenURL: "", qiniuUploadTokenFunction: null, qiniuShouldUseQiniuFileName: !1 }; module.exports = { init: function (a) { b = { qiniuRegion: "", qiniuImageURLPrefix: "", qiniuUploadToken: "", qiniuUploadTokenURL: "", qiniuUploadTokenFunction: null, qiniuShouldUseQiniuFileName: !1 }; h(a) }, upload: function (a, d, f, c, e, g) { null == a ? console.error("qiniu uploader need filePath to upload") : (c && h(c), b.qiniuUploadToken ? k(a, d, f, c, e, g) : b.qiniuUploadTokenURL ? p(function () { k(a, d, f, c, e, g) }) : b.qiniuUploadTokenFunction ? (b.qiniuUploadToken = b.qiniuUploadTokenFunction(), null == b.qiniuUploadToken && 0 < b.qiniuUploadToken.length ? console.error("qiniu UploadTokenFunction result is null, please check the return value") : k(a, d, f, c, e, g)) : console.error("qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]")) } } })();