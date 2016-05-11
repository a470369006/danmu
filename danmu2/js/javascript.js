+ function ($, document) {
    /*事先从服务器获取数据，以备用*/
    var $json = [{
            name: '哈士奇',
            url: 'images/1.jpg',
            words: '祝：早生贵子，白头偕老'
                }, {
            name: '哈士奇',
            url: 'images/2.jpg',
            words: '执子之手，方知子丑，泪流满面，子不走我走'
                }
                /*, {
                                name: '哈士奇',
                                url: 'images/3.jpg',
                                words: '爽快的交出存折的密码，顺利的收藏好初恋的情书，用结婚的壮举给所有，单身汉带来最大的鼓舞！'
                            }, {
                                name: '哈士奇',
                                url: 'images/4.jpg',
                                words: '让我们热情高涨，满怀期待，强烈祝贺，一个，好男人的幸福生活，从此——盛大开幕'
                            }, {
                                name: '哈士奇',
                                url: 'images/5.jpg',
                                words: '男的最后想通了，女的终于看开了。珠联壁合洞房春暖，花好月圆鱼水情深。'
                            }, {
                                name: '哈士奇',
                                url: 'images/6.jpg',
                                words: '一纸老虎，一米老鼠，点花烛，一起住;一个成了丈夫，一个未来当母，噜噜噜，真幸福!祝小两口结婚快乐乎!'
                            }, {
                                name: '哈士奇',
                                url: 'images/7.jpg',
                                words: '男的最后想通了，女的终于看开了。珠联壁合洞房春暖，花好月圆鱼水情深。'
                            }, {
                                name: '哈士奇',
                                url: 'images/8.jpg',
                                words: '老娘法眼一开就知道你是我的菜了，哈哈哈哈哈'
                            }, {
                                name: '哈士奇',
                                url: 'images/9.jpg',
                                words: '树上的鸟儿成双对,绿水青山带笑颜'
                            }, {
                                name: '哈士奇',
                                url: 'images/10.jpg',
                                words: '愿快乐的歌声永远伴你们同行,愿你们婚后的生活洋溢着喜悦与欢快,永浴于无穷的快乐年华'
                            }, {
                                name: '哈士奇',
                                url: 'images/11.jpg',
                                words: '千年的缘分今日牵手,百年的祈愿此刻白首。'
                            }, {
                                name: '哈士奇',
                                url: 'images/12.jpg',
                                words: '阳光照,小鸟叫,花含笑,喜事到。天作美,珠联璧合;人和美,永沐爱河。'
                            }, {
                                name: '哈士奇',
                                url: 'images/13.jpg',
                                words: '在你们大喜的日子里,送上一份祝福:来年喜笑得贵子,夫妻恩爱百年期'
                            }*/
            ];

    var tip = {
            w: $('.blz-danmu').width(),
            index: 0,
            newIndex: 0,
            time: 8,
            clear: null
        }
        //合并json数据,并初始化tip.index值
    function mergeJson(news, old) {
        $json.splice(tip.newIndex, 0, news);
    }

    /*为每个弹幕盒子分配一条消息*/
    function assignMessage($target, data) {
        var name = data.name;
        var dl = document.createElement('dl');
        $(dl).html('<dt class="blz-dial-title" aria-label="' + name + '"><img src="' + data.url + '" alt="' + name + '" title="' + name + '"></dt><dd class="blz-dial-para">' + data.words + '</dd>')
        $target.append($(dl))
        return $(dl);
    }

    /*为元素添加偏移量,运行完毕后清除该元素*/
    function addAnimate($target, cssObject, t) {
        setTimeout(function () {
                $target.css(cssObject)
                setTimeout(function () {
                    $target.remove();
                }, t)
            }, 30) //原设置时间为0，经测试效果不理想，改为30后，效果正常
    }

    //计算元素长度，和动画过渡时间
    function getWT(data, fontSize, customL) {
        var obj = {}
        obj.w = data.words.length * fontSize + customL;
        obj.t = tip.time * (tip.w + obj.w) / tip.w;
        return obj
    }



    //弹幕程序
    function danmu($danmu, data) {
        if ($json.length != 0) {
            tip.index >= $json.length ? tip.index = 0 : null;
            tip.newIndex = tip.index;
            var $target = assignMessage($danmu, data[tip.index]);
            var obj = getWT(data[tip.index++], 30, 100)
            addAnimate($target, {
                '-webkit-transform': 'translate(' + (-tip.w - obj.w) + 'px)',
                '-webkit-transition-duration': obj.t - 6 + 's'
            }, (obj.t - 6) * 1000);
            setTimeout(function () {
                danmu($danmu, data)
            }, 1000 * (obj.t - 6) * obj.w / (tip.w + obj.w))
        }

    }
    //执行你的程序
    $('[data-blz-danmu]').each(function (index, element) {
        danmu($(this), $json)
    });


    $("#second-section").hide();
    $("#last-section").hide();

    //导航条
    $("#nav a").click(function () {
        var $index = $(this).index();
        $(this).find("span").addClass("span-red");
        $(this).siblings().find("span").removeClass();
        if ($index == 2) {
            $(".danmuqu,.pinglunqu,.videoqu").hide();
        } else {
            $(".danmuqu,.pinglunqu,.videoqu").show();
        }
        $("#nav-section section").eq($index).show().siblings().hide();
        if ($index === 0) {
            $('.blz-50-link').show()
        } else {
            $('.blz-50-link').hide()
        }

    })

    //打开红包
    $("#separate-btn").click(function () {
        $(this).parent().hide().siblings().show();
    })

    //发送弹幕
    $("#send-danmu").click(function () {
        var oTxt = $("#txt-danmu").val();
        console.log(oTxt)
        var newWord = {
            name: '客户',
            url: 'images/1.jpg',
            words: oTxt
        };
        if ($("#txt-danmu").val() != "") {
            mergeJson(newWord, $json);
        }

        console.log($json)
        $("#txt-danmu").val("")
    })

    $("#nav-flex").scroll(function () {
        var $scrollTop = $("#nav-flex").scrollTop()
        if ($scrollTop > 50) {
            $("#scrllHidden").slideUp();
        }
        if ($scrollTop == 0) {
            $("#scrllHidden").slideDown();
        }
    })



}(window.Zepto || window.jQuery, document);

//金婚动画
+ function ($, document) {
    /*后台json数据格式*/
    var $json = [
        {
            url: 'images/1.jpg',
            name: '范冰冰'
            },
        {
            url: 'images/2.jpg',
            name: '小S'
            },
        {
            url: 'images/3.jpg',
            name: '大S'
            },
        {
            url: 'images/4.jpg',
            name: '范玮琪'
            },
        {
            url: 'images/5.jpg',
            name: '张韶涵'
            },
        {
            url: 'images/6.jpg',
            name: '孙燕姿'
            },
        {
            url: 'images/7.jpg',
            name: '王心凌'
            },
        {
            url: 'images/8.jpg',
            name: '张靓颖'
            },
        {
            url: 'images/9.jpg',
            name: '李正贤'
            },
        {
            url: 'images/10.jpg',
            name: 'she'
            },
        {
            url: 'images/11.jpg',
            name: '田馥甄'
            },
        {
            url: 'images/12.jpg',
            name: '萨顶顶'
            },
        {
            url: 'images/12.jpg',
            name: 'ladygaga'
            }
	];
    var tip = {
        count: 0
    };
    var $lis = $('.blz-photo-wall li');
    var $BPW = $('.blz-photo-wisher').eq(0);
    var a = [
			2, 3, 4, 5, 6, 11, 13, 15, 16, 17, 18, 19,
			21, 22, 26, 27, 31, 33, 35, 38,
			41, 47, 51, 53, 55, 56, 57, 58, 59,
			60, 61, 62, 63, 64, 65, 66, 67, 68, 70, 71, 72, 73, 74, 75, 78,
			80, 84, 88, 91, 93, 95, 96, 98, 99,
			104, 111, 113,
			121, 122, 123, 124, 125, 126, 127, 131, 133, 134, 135, 136, 137, 138, 139,
			144, 151, 153, 155, 159,
			161, 164, 167, 171, 173, 713, 175, 176, 177, 178, 179,
			181, 182, 183, 184, 185, 186, 187, 191, 192, 193, 194, 195, 199,
			204, 213, 215, 219,
			220, 221, 222, 223, 224, 225, 226, 227, 228, 230, 231, 232, 233, 235, 236, 237, 238, 239
	];
    var a1 = a.slice();
    for (var i = 0, j = a.length; i < j; i++) {
        $lis.eq(a[i]).addClass('active');
    }

    /*制作随机数*/
    function makeRandom(n) { /*参数n为随机数的上限*/
        return Math.floor(Math.random() * n);
    }

    /*数组自减*/
    function arrayDecrement(a, index) { /*a为目标数组，index为要删除的数组值得索引*/
        return a1.splice(index, 1)
    }
    /*插入图片函数*/
    function insertImage() {
        var img = new Image();
        img.src = $json[tip.count].url
        img.onload = function () {
            var aRandom = makeRandom(a1.length);
            var $this = $(this);
            $lis.eq(a1[aRandom]).html('<div><img src="' + this.src + '"></div>');
            $BPW.html('<img src="' + this.src + '"><p>' + $json[tip.count].name + '</p><span>刚刚为Ta们购买</span>')
            setTimeout(function () {
                $lis.eq(a1[aRandom]).find('div').fadeIn(1000);
                $BPW.addClass('animate');
                arrayDecrement(a1, aRandom);
            }, 30)
            tip.count++;
            if (tip.count < a.length && tip.count < $json.length) {
                setTimeout(function () {
                    $BPW.removeClass('animate');
                    insertImage();
                }, 5000);
            }
        }
    }
    insertImage();
}(window.Zepto || window.jQuery, document);
