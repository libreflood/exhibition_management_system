/**
 * Created by 大舅哥 on 2016/6/13.
 */

var merchantName = new Array(0);
var merchantPassword = new Array(0);

//用一个init函数预设？
var platformId = new Array(0);
var platformSize = new Array(0);

var p2mId = new Array(0);
var p2mName = new Array(0);
var p2mSize = new Array(0);
var p2mTime = new Array(0);
var p2mType = new Array(0);
function init(){
	merchantName.push("xuyue");
	merchantPassword.push("xuyue");
	merchantName.push("grandpa");
	merchantPassword.push("grandpa");
	merchantName.push("monkey");
	merchantPassword.push("monkey");
	p2mId.push("0");
	p2mName.push("xuyue");
	p2mSize.push("3");
	p2mTime.push("3");
	p2mType.push("手机");
	p2mId.push("1");
	p2mName.push("xuyue");
	p2mSize.push("3");
	p2mTime.push("3");
	p2mType.push("单反");
	p2mId.push("2");
	p2mName.push("xuyue");
	p2mSize.push("3");
	p2mTime.push("3");
	p2mType.push("电脑");
	p2mId.push("3");
	p2mName.push("grandpa");
	p2mSize.push("2");
	p2mTime.push("2");
	p2mType.push("VR设备");
	p2mId.push("4");
	p2mName.push("grandpa");
	p2mSize.push("2");
	p2mTime.push("2");
	p2mType.push("智能手表");
	p2mId.push("5");
	p2mName.push("grandpa");
	p2mSize.push("2");
	p2mTime.push("2");
	p2mType.push("手机");
	p2mId.push("6");
	p2mName.push("monkey");
	p2mSize.push("1");
	p2mTime.push("3");
	p2mType.push("电脑");
	p2mId.push("7");
	p2mName.push("monkey");
	p2mSize.push("1");
	p2mTime.push("3");
	p2mType.push("耳机");
	p2mId.push("8");
	p2mName.push("monkey");
	p2mSize.push("1");
	p2mTime.push("3");
	p2mType.push("手机");
}

/*
function tryit() {
    var objs = new Array(0);
    var obj = {};
    obj.name = "111";
    obj.id = 1;
    obj.time = 2;
    objs.push(obj);
    var obj2 = {};
    obj2.name = "111";
    obj2.id = 1;
    obj2.time = 2;
    objs.push(obj2);
    alert(JSON.stringify(objs));
}
*/

function Merchant2Database(object) {
	console.log("%s %s",object["name"],object["password"]);
	var length = merchantName.length;
    var i = 0;
    while(i < length){
        if(merchantName[i] == object.name){
			
            return false;
        }
        i++;
    }
    merchantName.push(object.name);
    merchantPassword.push(object.password);
    return true;
}

function Platforms2Database(object) {
    var length = p2mId.length;
    var i = 0;
    var j = 0;
    /*while(i < object.number){
        //是否已被申请
        while(j < length){
            if(object.platforms[i].id == p2m[j]){
                return false;
            }
            j++;
        }
        i++;
    }*/
    //所有展位未被申请
    while(i < object.number){
        p2mId.push(object.platforms[i].id+length);
        p2mName.push(object.name);
        p2mTime.push(object.platforms[i].time);
		p2mSize.push(object.platforms[i].size);
		p2mType.push(object.platforms[i].type);
		console.log("%s %s %s", p2mName[object.platforms[i].id+length],p2mTime[object.platforms[i].id+length],p2mSize[object.platforms[i].id+length]);
		i++;
    }
    return true;
}

function CheckUsrInfo(object) {
    var name = object.name;
    var password = object.password;
    var length = merchantName.length;
    var i = 0;
    while(i < length){
        if(merchantName[i] == object.name){
            if(merchantPassword[i] == object.password){
                return true;
            }else{
                return false;
            }
        }
        i++;
    }
    return false;
}

function Search(object){
    var i = 0;
    var j = 0;
    var lengthM = merchantName.length;
    var lengthP = platformId.length;
    var lengthP2M = p2mId.length;
    var merchants;
    var merchantSingle;
    var platforms;
    if(object.type == "merchant"){
        //所有展商
        if(object.name == "all") {
            merchants = new Array(0);
            while(i < lengthM){
				singleM = [];
                while(j < lengthP2M){
                    if(p2mName[j] == merchantName[i]){
                        var singleP2M = {};
                        singleP2M.name = merchantName[i];
                        singleP2M.id = p2mId[j];
                        singleP2M.size = p2mSize[j];
                        singleP2M.time = p2mTime[j];
						singleP2M.type = p2mType[j];
                        singleM.push(singleP2M);
                    }
                    j++;
                }
                i++;
				j=0;
				merchants.push(singleM);
            }
			console.log(merchants);
            return merchants;
        }
        //具体展商
        else{
			var merchants = new Array(0);
            var singleM = new Array(0);
            while(i < lengthM){
                if(merchantName[i] == object.name){
                    while(j < lengthP2M) {
                        if (p2mName[j] == merchantName[i]) {
                            var singleM1 = {};
                            singleM1.name = merchantName[i];
                            singleM1.id = p2mId[j];
                            singleM1.size = p2mSize[j];
                            singleM1.time = p2mTime[j];
							singleM1.type = p2mType[j];
                            singleM.push(singleM1);
                        }
                        j++;
                    }
					merchants.push(singleM)
					console.log(merchants);
                    return merchants;
                }
                i++;
            }
            //无，返回空JSON
            return null;
        }
    }else{
        //所有展台
        if(object.name == "all"){
            platforms = new Array(0);
               while(j < lengthP2M){
                   
                       var singleP = {};
                       singleP.id = p2mId[j];
                       singleP.size = p2mSize[j];
                       singleP.name = p2mName[j];
                       singleP.time = p2mTime[j];
					   singleP.type = p2mType[j];
                       platforms.push(singleP);
                   
                   j++;
               }
		   console.log(platforms);
            return platforms;
        }
        //具体展台
        else{
            
			platforms = new Array(0);
            while(j < lengthP2M){
                        if(p2mName[j] == object.name){
                            var singleP1 = {};
                            singleP1.id = p2mId[j];
                            singleP1.size = p2mSize[j];
                            singleP1.name = p2mName[j];
                            singleP1.time = p2mTime[j];
							singleP1.type = p2mType[j];
							platforms.push(singleP1);
                        }
                        j++;
            }
					console.log(platforms);
                    return platforms;
                
            return null;
        }
    }
}