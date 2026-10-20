window.SITE_CONTENT = {
  categories: [
    {
      label: "旅游",
      english: "TRAVEL JOURNAL",
      description: "按城市整理每一段旅程，点进去看景点与城市味道。",
      meta: "06 DESTINATIONS",
      href: "./travel.html",
      image: "./assets/images/taian-mount-tai-08.jpg",
      imageAlt: "泰山日出的旅行笔记封面",
      previewIndex: "01",
      previewCaption: "TRAVEL JOURNAL"
    },
    {
      label: "推荐",
      english: "CURATED FEED",
      description: "网页、文章、工具与推文，一些值得放进收藏夹的灵感。",
      meta: "BOOKMARKS",
      href: "./recommendations.html",
      image: "./assets/images/recommend-desk.jpg",
      imageAlt: "桌面上摊开的笔记本、咖啡与电脑",
      previewIndex: "02",
      previewCaption: "CURATED FEED"
    }
  ],

  food: {
    filters: [
      { value: "all", label: "全部" },
      { value: "breakfast", label: "早餐" },
      { value: "noodles", label: "面食" },
      { value: "coffee", label: "咖啡" },
      { value: "dessert", label: "甜点" }
    ],
    items: [
      {
        category: "noodles",
        categoryLabel: "面食",
        location: "四姑娘山镇",
        title: "一碗热汤面",
        note: "下山后的第一顿热食。汤清但不薄，喝完最后一口也不会觉得负担；在冷风里走了一整天以后，这一碗格外妥帖。",
        repeat: "下山还会吃",
        image: "./assets/images/food-noodles.jpg",
        alt: "鲜虾溏心蛋汤面"
      },
      {
        category: "breakfast",
        categoryLabel: "早餐",
        location: "河口湖",
        title: "周末的莓果早餐",
        note: "不赶时间的早晨才配得上这样一桌。燕麦、华夫饼和水果，是把周末慢慢打开的仪式。",
        repeat: "想再来",
        image: "./assets/images/food-breakfast.jpg",
        alt: "莓果燕麦、华夫饼与咖啡早餐"
      },
      {
        category: "noodles",
        categoryLabel: "面食",
        location: "多洛米蒂山脚",
        title: "番茄罗勒蝴蝶面",
        note: "走完湖边的小路，坐在窗边吃一盘面。番茄的酸和罗勒的香气，像把雨后的空气也一起端上了桌。",
        repeat: "会再点",
        image: "./assets/images/food-pasta.jpg",
        alt: "番茄罗勒蝴蝶面"
      },
      {
        category: "coffee",
        categoryLabel: "咖啡",
        location: "布莱耶斯湖",
        title: "三杯咖啡的下午",
        note: "等云散开的下午，三杯咖啡，一张靠窗桌子。旅行里总要有这样一段没有安排的时间，什么也不赶。",
        repeat: "收藏",
        image: "./assets/images/food-coffee.jpg",
        alt: "三杯咖啡碰杯"
      },
      {
        category: "dessert",
        categoryLabel: "甜点",
        location: "杭州",
        title: "焦糖冰淇淋布朗尼",
        note: "冷的冰淇淋、热的焦糖和微苦的巧克力同时出现。甜得很直接，但偶尔就需要这种直接。",
        repeat: "心情好时",
        image: "./assets/images/food-dessert.jpg",
        alt: "淋着焦糖的冰淇淋布朗尼"
      },
      {
        category: "breakfast",
        categoryLabel: "早餐",
        location: "山中湖",
        title: "牛油果溏心蛋吐司",
        note: "火候比摆盘重要。蛋要流心，面包边要脆，再配一杯不需要加糖的咖啡。",
        repeat: "家常版",
        image: "./assets/images/food-toast.jpg",
        alt: "牛油果溏心蛋吐司"
      }
    ]
  },

  travel: {
    intro: {
      eyebrow: "HOW I ARCHIVE TRAVEL",
      title: "先选一座城市，",
      titleEmphasis: "再看景点与味道。",
      copy: [
        "我把旅行按城市整理。景点留下当时看见的世界，美食留下坐下来以后记住的味道。",
        "不是每个景点都要配一顿饭，有就记下，没有也不硬凑。只记录那些愿意再看一眼、再吃一次的瞬间。"
      ],
      stats: [
        { value: "06", label: "座城市" },
        { value: "13", label: "段景色" },
        { value: "03", label: "次回味" }
      ]
    },
    destinations: [
      {
        id: "liuzhou",
        number: "01",
        name: "柳州",
        region: "广西 · 中国",
        date: "2026.09.26—10.01",
        coords: "24°N · 109°E",
        heroImage: "./assets/images/liuzhou-sunset.jpg",
        foodTitle: "螺蛳粉圣都",
        intro:
          "柳州把山水放在城市里。白天沿江看山，晚上去五星街为一碗螺蛳粉排队。",
        spots: [
          {
            id: "maanshan",
            name: "马鞍山公园",
            scenery: {
              title: "二十分钟，登上柳州的夜色",
              image: "./assets/images/liuzhou-maanshan-night-02.jpg",
              alt: "从马鞍山山顶俯瞰柳州夜景，柳江从城市灯光之间穿过",
              excerpt: "国庆前夕，跟着一路红旗往上爬，二十分钟到顶，整座城刚好亮起来。",
              note: "夜爬 / 国庆前夕 / 城市夜景",
              gallery: [
                {
                  image: "./assets/images/liuzhou-maanshan-night-02.jpg",
                  thumb: "./assets/images/liuzhou-maanshan-night-02-thumb.jpg",
                  alt: "柳州夜景，柳江从城市灯光之间穿过",
                  caption: "柳江与灯火"
                },
                {
                  image: "./assets/images/liuzhou-maanshan-night-01.jpg",
                  thumb: "./assets/images/liuzhou-maanshan-night-01-thumb.jpg",
                  alt: "从马鞍山山顶俯瞰柳州夜景，远处楼宇亮着红色灯光",
                  caption: "山顶的城市夜色"
                },
                {
                  image: "./assets/images/liuzhou-maanshan-night-03.jpg",
                  thumb: "./assets/images/liuzhou-maanshan-night-03-thumb.jpg",
                  alt: "马鞍山夜爬路上的红旗与石阶",
                  caption: "一路红旗"
                },
                {
                  image: "./assets/images/liuzhou-maanshan-night-04.jpg",
                  thumb: "./assets/images/liuzhou-maanshan-night-04-thumb.jpg",
                  alt: "马鞍山山顶亮着灯的亭子与月亮",
                  caption: "山顶的亭子"
                },
                {
                  image: "./assets/images/liuzhou-maanshan-night-05.jpg",
                  thumb: "./assets/images/liuzhou-maanshan-night-05-thumb.jpg",
                  alt: "马鞍山登山道两侧插满国旗",
                  caption: "国旗下的登山道"
                }
              ],
              paragraphs: [
                "到马鞍山的时候天已经黑了，登山道两侧插满红旗。国庆前夕，风把旗子吹得很响，像是给每一个往上走的人打拍子。",
                "我们几乎没停，二十分钟极限登顶。站在山顶往下看，柳江拐了个弯，楼宇的灯和红色灯光秀一起铺开；<em>那一刻，城市的夜色和节日的红色正好撞在一起</em>。",
                "山顶的亭子亮着灯，月亮就挂在树梢旁边。吹了一会儿风，大家举着手机拍夜景，也算一起为祖国庆生。"
              ]
            }
          },
          {
            id: "liuhou",
            name: "柳侯公园",
            scenery: {
              title: "35 度的浪漫",
              image: "./assets/images/liuzhou-liuhou-park-01.jpg",
              alt: "柳侯公园的湖面、绿树与广西风格建筑",
              excerpt: "好热，也好美。树荫、拱门和水面，把这个夏天的热气分走了一半。",
              note: "公园 / 盛夏 / 广西园林",
              gallery: [
                {
                  image: "./assets/images/liuzhou-liuhou-park-01.jpg",
                  thumb: "./assets/images/liuzhou-liuhou-park-01-thumb.jpg",
                  alt: "柳侯公园的湖面、绿树与广西风格建筑",
                  caption: "柳侯公园的绿"
                },
                {
                  image: "./assets/images/liuzhou-liuhou-park-02.jpg",
                  thumb: "./assets/images/liuzhou-liuhou-park-02-thumb.jpg",
                  alt: "柳侯公园白墙拱门与垂下来的藤蔓",
                  caption: "拱门后的夏天"
                },
                {
                  image: "./assets/images/liuzhou-liuhou-park-03.jpg",
                  thumb: "./assets/images/liuzhou-liuhou-park-03-thumb.jpg",
                  alt: "柳侯公园水面倒映着树木与亭子",
                  caption: "一池倒影"
                },
                {
                  image: "./assets/images/liuzhou-liuhou-park-04.jpg",
                  thumb: "./assets/images/liuzhou-liuhou-park-04-thumb.jpg",
                  alt: "柳侯公园老建筑旁倾斜生长的树干与石阶",
                  caption: "树与老建筑"
                },
                {
                  image: "./assets/images/liuzhou-liuhou-park-05.jpg",
                  thumb: "./assets/images/liuzhou-liuhou-park-05-thumb.jpg",
                  alt: "柳侯公园里一簇蓝紫色的小花",
                  caption: "蓝色小花"
                },
                {
                  image: "./assets/images/liuzhou-liuhou-park-06.jpg",
                  thumb: "./assets/images/liuzhou-liuhou-park-06-thumb.jpg",
                  alt: "柳侯公园里一串红色的花",
                  caption: "红色的花"
                }
              ],
              paragraphs: [
                "柳侯公园的绿是层层叠叠的：大树的影子压在白墙上，拱门后又是一片亮得发光的叶子。",
                "那天 35 度，走几步就要停下来喝水。可树荫、石桥和水面把热气分走了一半，<em>越热越觉得这里有一种很广西的浪漫</em>。",
                "园子不大，慢慢走一圈，会遇见开在树干上的花、廊下的风，还有水面把整座园子倒过来的样子。"
              ]
            }
          },
          {
            id: "wuxing-street",
            name: "五星步行街",
            scenery: {
              title: "五星街的傍晚",
              image: "./assets/images/liuzhou-wuxing-street.jpg",
              alt: "柳州五星步行街，街口悬挂着五星美食街的红色招牌",
              excerpt: "招牌、骑楼、粉店和下班的人，把一条街填得很满。",
              note: "步行街 / 傍晚 / 美食街",
              gallery: [
                {
                  image: "./assets/images/liuzhou-wuxing-street.jpg",
                  thumb: "./assets/images/liuzhou-wuxing-street-thumb.jpg",
                  alt: "柳州五星步行街，街口悬挂着五星美食街的红色招牌",
                  caption: "五星街的街口"
                },
                {
                  image: "./assets/images/liuzhou-wuxing-street-02.jpg",
                  thumb: "./assets/images/liuzhou-wuxing-street-02-thumb.jpg",
                  alt: "五星步行街上空悬挂的彩色布幔，从蓝紫渐变到橙黄",
                  caption: "头顶的彩虹"
                }
              ],
              paragraphs: [
                "到五星街的时候，天还没完全暗。街口的五颗星先亮起来，红色招牌把整条街照得很有精神。",
                "这里没有很刻意的“景点感”。酒店、粉店、小吃摊和下班的人挤在一起，<em>柳州的日常就这样热热闹闹地铺在眼前</em>。"
              ]
            }
          },
          {
            id: "museum",
            name: "柳州博物馆",
            scenery: {
              title: "纸伞把头顶撑满",
              image: "./assets/images/liuzhou-museum-01.jpg",
              alt: "柳州博物馆内悬挂的彩色纸伞与墙面壁画",
              excerpt: "外观规整得像一栋普通办公楼，进去以后，纸伞和壁画把空间填得很满。",
              note: "博物馆 / 午后 / 城中",
              gallery: [
                {
                  image: "./assets/images/liuzhou-museum-01.jpg",
                  thumb: "./assets/images/liuzhou-museum-01-thumb.jpg",
                  alt: "柳州博物馆内悬挂的彩色纸伞与墙面壁画",
                  caption: "纸伞与壁画"
                },
                {
                  image: "./assets/images/liuzhou-museum-02.jpg",
                  thumb: "./assets/images/liuzhou-museum-02-thumb.jpg",
                  alt: "柳州博物馆天窗下悬挂的彩色纸伞",
                  caption: "头顶的纸伞"
                },
                {
                  image: "./assets/images/liuzhou-museum-03.jpg",
                  thumb: "./assets/images/liuzhou-museum-03-thumb.jpg",
                  alt: "柳州博物馆正门，灰色立面与三面红旗",
                  caption: "博物馆门口"
                }
              ],
              paragraphs: [
                "柳州博物馆就在市中心，灰色立面、红旗和门口的红灯笼，看起来是那种很容易路过的地方。",
                "进去以后，头顶的纸伞一层层铺开，颜色和墙上的壁画连在一起。展陈不算惊艳，空调也一般般，<em>但如果在附近又有空，慢慢看一圈还是值得</em>。"
              ]
            }
          }
        ],
        food: {
          note: "柳州的味道很直接。酸、辣、鲜一起上来，吃完再沿江走一段。",
          items: [
            {
              title: "柳州螺蛳粉",
              place: "柳州",
              type: "米粉",
              near: "五星步行街",
              image: "./assets/images/liuzhou-luosifen-01.jpg",
              alt: "三碗柳州螺蛳粉，配炸蛋、腐竹和青菜",
              gallery: [
                {
                  image: "./assets/images/liuzhou-luosifen-01.jpg",
                  thumb: "./assets/images/liuzhou-luosifen-01-thumb.jpg",
                  alt: "三碗柳州螺蛳粉，配炸蛋、腐竹和青菜",
                  caption: "三个人，三碗粉"
                },
                {
                  image: "./assets/images/liuzhou-luosifen-02.jpg",
                  thumb: "./assets/images/liuzhou-luosifen-02-thumb.jpg",
                  alt: "柳州螺蛳粉配炸蛋、腐竹、鸭脚和一碗黑色甜品",
                  caption: "加蛋，也加一份甜品"
                }
              ],
              note: "汤头酸辣，米粉滑，酸笋的味道先冲上来，后面是螺蛳汤的回甘。这次加了炸蛋和腐竹，旁边再配一碗冰凉的甜品，辣和甜刚好打了个平手。",
              repeat: "还会再吃"
            },
            {
              title: "老友粉",
              place: "柳州",
              type: "米粉",
              image: "./assets/images/liuzhou-laoyoufen.jpg",
              alt: "柳州老友粉，配牛肉、酸笋、黄瓜丝和柠檬",
              note: "酸笋、豆豉和牛肉把味道压得很足，黄瓜丝和半片柠檬又把酸辣提亮。粉吸饱了酱汁，吃到后面还是想再拌两口。",
              repeat: "下次还点"
            },
            {
              title: "果酱烧烤",
              place: "柳州",
              type: "烧烤",
              image: "./assets/images/liuzhou-guojiang-shaokao-01.jpg",
              alt: "柳州果酱烧烤，黄色托盘里铺满刷了酱汁的肉串",
              gallery: [
                {
                  image: "./assets/images/liuzhou-guojiang-shaokao-01.jpg",
                  thumb: "./assets/images/liuzhou-guojiang-shaokao-01-thumb.jpg",
                  alt: "柳州果酱烧烤，黄色托盘里铺满刷了酱汁的肉串",
                  caption: "第一盘肉串"
                },
                {
                  image: "./assets/images/liuzhou-guojiang-shaokao-02.jpg",
                  thumb: "./assets/images/liuzhou-guojiang-shaokao-02-thumb.jpg",
                  alt: "几个人举起塑料杯碰杯，桌上摆着果酱烧烤",
                  caption: "先干一杯"
                }
              ],
              note: "为了这一顿跑了三趟，朋友笑说像三顾茅庐。真正坐到桌前，刷了果酱的肉串在炭火上冒油，甜、辣、焦香一起上来，才明白等的就是这位“烧烤界的诸葛亮”。",
              repeat: "三顾也值得"
            }
          ]
        }
      },
      {
        id: "shanghai",
        number: "02",
        name: "上海",
        region: "上海 · 中国",
        date: "2026.09.25",
        coords: "31°N · 121°E",
        heroImage: "./assets/images/shanghai-pudong-museum-01.jpg",
        intro:
          "把下午留给浦东美术馆：安静的小画、一整间发亮的蓝，还有窗边刚好赶上的落日。",
        spots: [
          {
            id: "pudong-museum",
            name: "浦东美术馆",
            scenery: {
              title: "蓝色房间里，身体像在漂浮",
              image: "./assets/images/shanghai-pudong-museum-01.jpg",
              alt: "浦东美术馆蓝色展厅里悬挂的两件大型装置，一件覆着白色圆点，一件呈黑色剪影",
              excerpt: "看过几幅安静的小画，再走进一整间发亮的蓝，最后在窗边等一场落日。",
              note: "美术馆 / 展览 / 黄昏",
              date: "2026.09.25",
              gallery: [
                {
                  image: "./assets/images/shanghai-pudong-museum-01.jpg",
                  thumb: "./assets/images/shanghai-pudong-museum-01-thumb.jpg",
                  alt: "浦东美术馆蓝色展厅里悬挂的两件大型装置，一件覆着白色圆点，一件呈黑色剪影",
                  caption: "一整间发亮的蓝"
                },
                {
                  image: "./assets/images/shanghai-pudong-museum-02.jpg",
                  thumb: "./assets/images/shanghai-pudong-museum-02-thumb.jpg",
                  alt: "浦东美术馆展厅里一幅装在金色画框中的风景油画",
                  caption: "金色画框里的风景"
                },
                {
                  image: "./assets/images/shanghai-pudong-museum-03.jpg",
                  thumb: "./assets/images/shanghai-pudong-museum-03-thumb.jpg",
                  alt: "浦东美术馆展厅里两只陶罐与一块黄色布料的静物油画",
                  caption: "两只陶罐与一块黄布"
                },
                {
                  image: "./assets/images/shanghai-pudong-museum-04.jpg",
                  thumb: "./assets/images/shanghai-pudong-museum-04-thumb.jpg",
                  alt: "浦东美术馆展厅里装在厚重黑色雕花画框中的黑白静物画",
                  caption: "黑框里的静物"
                },
                {
                  image: "./assets/images/shanghai-pudong-museum-05.jpg",
                  thumb: "./assets/images/shanghai-pudong-museum-05-thumb.jpg",
                  alt: "从浦东美术馆窗前望向黄浦江对岸，落日落在城市天际线后",
                  caption: "窗边的落日"
                }
              ],
              paragraphs: [
                "浦东美术馆的展厅留了很多白墙，几幅画安安静静地挂着。远处的风景、两只陶罐和一块黄布，颜色都不多，却让人愿意把步子放慢。",
                "另一间展厅忽然变成整片蓝色。两件巨大的身体悬在半空，一件覆着细密圆点，一件沉成黑色剪影，脚下也铺满流动的纹路。<em>像走进一幅还没干的画里</em>。",
                "看完展，太阳正落到黄浦江对岸的建筑后面。玻璃映着室内，窗外是城市，脚边还留着走累的痕迹。<em>艺术和日常只隔着一层窗</em>。"
              ]
            }
          }
        ]
      },
      {
        id: "jinan",
        number: "03",
        name: "济南",
        region: "山东 · 中国",
        date: "2026.07.04—05",
        coords: "36°N · 117°E",
        intro: "济南的好，藏在一泉一街之间。走累了，就坐下来吃一块把子肉。",
        spots: [
          {
            id: "baotu",
            name: "趵突泉",
            scenery: {
              title: "泉水一直在往上走",
              image: "./assets/images/jinan-baotu-spring-01.jpg",
              alt: "趵突泉清澈的泉池、游动的锦鲤与右侧跌落的泉水",
              excerpt: "池水清得发亮，泉眼不停地把城市往上托。",
              note: "泉水 / 上午 / 老城",
              gallery: [
                {
                  image: "./assets/images/jinan-baotu-spring-01.jpg",
                  thumb: "./assets/images/jinan-baotu-spring-01-thumb.jpg",
                  alt: "趵突泉清澈的泉池、游动的锦鲤与右侧跌落的泉水",
                  caption: "泉池与锦鲤"
                },
                {
                  image: "./assets/images/jinan-baotu-spring-06.jpg",
                  thumb: "./assets/images/jinan-baotu-spring-06-thumb.jpg",
                  alt: "趵突泉水面泛起的涟漪与游动的红色锦鲤",
                  caption: "涟漪与红鲤"
                },
                {
                  image: "./assets/images/jinan-baotu-spring-02.jpg",
                  thumb: "./assets/images/jinan-baotu-spring-02-thumb.jpg",
                  alt: "趵突泉清池里游动的鱼群与右侧落下的泉水",
                  caption: "清池里的鱼影"
                },
                {
                  image: "./assets/images/jinan-baotu-spring-03.jpg",
                  thumb: "./assets/images/jinan-baotu-spring-03-thumb.jpg",
                  alt: "趵突泉的泉水越过石阶，形成层层白色的水花",
                  caption: "泉水越过石阶"
                },
                {
                  image: "./assets/images/jinan-baotu-spring-04.jpg",
                  thumb: "./assets/images/jinan-baotu-spring-04-thumb.jpg",
                  alt: "趵突泉泉池与石岸间的流水、树影和游人",
                  caption: "泉池与流水"
                },
                {
                  image: "./assets/images/jinan-baotu-spring-05.jpg",
                  thumb: "./assets/images/jinan-baotu-spring-05-thumb.jpg",
                  alt: "趵突泉深色池水中游动的红色锦鲤与远处的小瀑布",
                  caption: "深水里的红鲤"
                }
              ],
              paragraphs: [
                "到趵突泉的时候，池边已经站了不少人。大家都不说话，只看水。",
                "泉眼一股一股往上翻，水声不大，却有一种很稳定的力量。那一刻我明白了，<em>济南的底气是从地下慢慢涌上来的</em>。",
                "池底的石纹和游动的锦鲤都看得清，水光一晃，红色就散开了。站在岸边，连时间也像被水流放慢了一拍。"
              ]
            }
          },
          {
            id: "wulongtan",
            name: "五龙潭公园",
            scenery: {
              title: "五条石龙，把泉水吐进潭里",
              image: "./assets/images/jinan-wulongtan-01.jpg",
              alt: "五龙潭公园的碧绿泉池、临水楼阁与远处城市高楼",
              excerpt: "潭水绿得发亮，石龙吐出的水线把老城与高楼连在一起。",
              note: "泉池 / 石龙 / 城市倒影",
              gallery: [
                {
                  image: "./assets/images/jinan-wulongtan-01.jpg",
                  thumb: "./assets/images/jinan-wulongtan-01-thumb.jpg",
                  alt: "五龙潭公园的碧绿泉池、临水楼阁与远处城市高楼",
                  caption: "老城与高楼的倒影"
                },
                {
                  image: "./assets/images/jinan-wulongtan-02.jpg",
                  thumb: "./assets/images/jinan-wulongtan-02-thumb.jpg",
                  alt: "五龙潭公园的临水楼阁、柳树与碧绿潭水中的倒影",
                  caption: "潭边的楼阁"
                },
                {
                  image: "./assets/images/jinan-wulongtan-03.jpg",
                  thumb: "./assets/images/jinan-wulongtan-03-thumb.jpg",
                  alt: "透过假山石洞望向五龙潭的临水楼阁与远处高楼",
                  caption: "从石缝里看五龙潭"
                },
                {
                  image: "./assets/images/jinan-wulongtan-04.jpg",
                  thumb: "./assets/images/jinan-wulongtan-04-thumb.jpg",
                  alt: "五龙潭公园并列的石龙头向池中喷水",
                  caption: "五龙吐水"
                }
              ],
              paragraphs: [
                "五龙潭公园比想象的安静。绕过假山和石桥，五座石龙头一起向池中吐水，水线落进潭里，只留下细碎的声响。",
                "再往池边站一会儿，临水楼阁、垂柳和远处的高楼都落在同一片水面上。<em>济南的老城与今天，在这里共用一面镜子</em>。"
              ]
            }
          },
          {
            id: "daminghu",
            name: "大明湖",
            scenery: {
              title: "从牌坊走进去，就是大明湖的夏天",
              image: "./assets/images/jinan-daminghu-01.jpg",
              alt: "济南大明湖入口牌坊，红色立柱、彩绘屋檐与垂柳",
              excerpt: "从牌坊走进湖边，荷叶、柳荫和一只坐在树下的黑猫，组成了大明湖的夏天。",
              note: "湖岸 / 午后 / 荷叶",
              gallery: [
                {
                  image: "./assets/images/jinan-daminghu-01.jpg",
                  thumb: "./assets/images/jinan-daminghu-01-thumb.jpg",
                  alt: "济南大明湖入口牌坊，红色立柱、彩绘屋檐与垂柳",
                  caption: "大明湖牌坊"
                },
                {
                  image: "./assets/images/jinan-daminghu-02.jpg",
                  thumb: "./assets/images/jinan-daminghu-02-thumb.jpg",
                  alt: "大明湖岸边层层叠叠的绿色荷叶与一朵粉色荷花",
                  caption: "一池荷叶"
                },
                {
                  image: "./assets/images/jinan-daminghu-03.jpg",
                  thumb: "./assets/images/jinan-daminghu-03-thumb.jpg",
                  alt: "大明湖景区内的大型花神装置，头饰由蓝紫色花朵组成",
                  caption: "湖边的花神装置"
                },
                {
                  image: "./assets/images/jinan-daminghu-04.jpg",
                  thumb: "./assets/images/jinan-daminghu-04-thumb.jpg",
                  alt: "一只黑猫安静地坐在大明湖公园的大树下",
                  caption: "树荫下的小黑猫"
                }
              ],
              paragraphs: [
                "从写着“大明湖”的牌坊走进去，柳枝先垂到眼前。风把湖面分成一层层细小的光，夏天的热气也像被压低了一点。",
                "荷叶在岸边铺得很满，花神装置立在树影之间，颜色比湖水还亮。绕湖走累了，又遇见一只安静坐在树下的黑猫。<em>大明湖的好，不只在湖本身，也在这些慢下来的小事里</em>。"
              ]
            }
          },
          {
            id: "shandong-museum",
            name: "山东博物馆",
            scenery: {
              title: "抬头，看见会发光的穹顶",
              image: "./assets/images/jinan-shandong-museum-01.jpg",
              alt: "山东博物馆灰色建筑立面、金色馆名与顶部圆形穹顶",
              excerpt: "正门很安静，走进大厅抬头，圆形穹顶像把一片森林翻到了天上。",
              note: "建筑 / 穹顶 / 青铜器",
              gallery: [
                {
                  image: "./assets/images/jinan-shandong-museum-01.jpg",
                  thumb: "./assets/images/jinan-shandong-museum-01-thumb.jpg",
                  alt: "山东博物馆灰色建筑立面、金色馆名与顶部圆形穹顶",
                  caption: "山东博物馆正门"
                },
                {
                  image: "./assets/images/jinan-shandong-museum-02.jpg",
                  thumb: "./assets/images/jinan-shandong-museum-02-thumb.jpg",
                  alt: "山东博物馆大厅中央巨大的圆形穹顶与一圈圈灯光",
                  caption: "会发光的穹顶"
                },
                {
                  image: "./assets/images/jinan-shandong-museum-03.jpg",
                  thumb: "./assets/images/jinan-shandong-museum-03-thumb.jpg",
                  alt: "山东博物馆展出的商代亚醜钺，青铜器表面有夸张的人面纹",
                  caption: "亚醜钺"
                }
              ],
              paragraphs: [
                "山东博物馆的正门很安静，灰色立面和金色馆名在蓝天下显得很克制。真正让人停下来的地方，要走进大厅再抬头。",
                "圆形穹顶像一片被翻到天上的森林，灯光一圈圈铺开，台阶上坐满了休息的人。<em>博物馆不只收着过去，也把一座城市的日常收进了同一片光里</em>。",
                "展厅里的亚醜钺保留着夸张的面孔，隔着玻璃看，还是会被那张咧开的嘴逗笑。"
              ]
            }
          },
        ]
      },
      {
        id: "taian",
        number: "04",
        name: "泰安",
        region: "山东 · 中国",
        date: "2026.07.02—03",
        coords: "36°N · 117°E",
        heroImage: "./assets/images/taian-mount-tai-08.jpg",
        intro: "夜里从岱宗坊出发，沿石阶一路向上，在泰山顶等天亮。",
        spots: [
          {
            id: "mount-tai",
            name: "泰山",
            scenery: {
              title: "爬一整夜，去等一场日出",
              image: "./assets/images/taian-mount-tai-08.jpg",
              alt: "泰山山顶日出，太阳从橘粉色云海中升起，游客在观景处拍照",
              excerpt: "夜色里从岱宗坊出发，沿石阶爬到山顶，在人群和风里等太阳从云海升起。",
              note: "夜爬 / 云海 / 日出",
              gallery: [
                {
                  image: "./assets/images/taian-mount-tai-08.jpg",
                  thumb: "./assets/images/taian-mount-tai-08-thumb.jpg",
                  alt: "泰山山顶日出，太阳从橘粉色云海中升起，游客在观景处拍照",
                  caption: "泰山日出"
                },
                {
                  image: "./assets/images/taian-mount-tai-01.jpg",
                  thumb: "./assets/images/taian-mount-tai-01-thumb.jpg",
                  alt: "夜色中被灯光照亮的岱宗坊石牌坊",
                  caption: "夜色里的岱宗坊"
                },
                {
                  image: "./assets/images/taian-mount-tai-02.jpg",
                  thumb: "./assets/images/taian-mount-tai-02-thumb.jpg",
                  alt: "泰山登山道上的天阶石坊与红色楹联",
                  caption: "天阶"
                },
                {
                  image: "./assets/images/taian-mount-tai-03.jpg",
                  thumb: "./assets/images/taian-mount-tai-03-thumb.jpg",
                  alt: "从泰山山脊俯瞰远处城市的灯火",
                  caption: "山下的灯火"
                },
                {
                  image: "./assets/images/taian-mount-tai-04.jpg",
                  thumb: "./assets/images/taian-mount-tai-04-thumb.jpg",
                  alt: "清晨的泰山山顶，人群聚集在亮灯的观景建筑前等待日出",
                  caption: "山顶的清晨"
                },
                {
                  image: "./assets/images/taian-mount-tai-05.jpg",
                  thumb: "./assets/images/taian-mount-tai-05-thumb.jpg",
                  alt: "泰山日出前，紫粉色云层覆盖天空",
                  caption: "天亮之前"
                },
                {
                  image: "./assets/images/taian-mount-tai-06.jpg",
                  thumb: "./assets/images/taian-mount-tai-06-thumb.jpg",
                  alt: "泰山日出前，红霞漫过山脊，人群在山顶形成剪影",
                  caption: "红霞漫过山脊"
                },
                {
                  image: "./assets/images/taian-mount-tai-07.jpg",
                  thumb: "./assets/images/taian-mount-tai-07-thumb.jpg",
                  alt: "泰山山顶被粉红色朝霞覆盖，游客举着手机拍照",
                  caption: "天空烧起来了"
                },
                {
                  image: "./assets/images/taian-mount-tai-09.jpg",
                  thumb: "./assets/images/taian-mount-tai-09-thumb.jpg",
                  alt: "泰山山崖上的“天下第一山”红色石刻",
                  caption: "天下第一山"
                },
                {
                  image: "./assets/images/taian-mount-tai-10.jpg",
                  thumb: "./assets/images/taian-mount-tai-10-thumb.jpg",
                  alt: "泰山山泉从刻有文字的石壁间流下",
                  caption: "石刻与山泉"
                }
              ],
              paragraphs: [
                "晚上十点多，岱宗坊的灯还亮着。我们背着包从这里出发，街上的车声慢慢落在身后。",
                "石阶一段接一段，夜色把山体压成黑色，只剩手电和远处城市的灯。到了山顶，所有人都裹着外套，在风里等天亮。",
                "天边先是一条很细的蓝，随后被云染成粉红。太阳从云海里露出来的时候，人群一下安静了，只剩快门声。<em>爬了一整夜，好像就是为了这几分钟</em>。",
                "下山时才看清路边的石刻和泉水。山不只是山顶的日出，也是石头上那些被时间留下的字。"
              ]
            }
          }
        ]
      },
      {
        id: "suzhou",
        number: "05",
        name: "苏州",
        region: "江苏 · 中国",
        date: "2026.07.27—28",
        coords: "31°N · 120°E",
        intro: "苏州适合慢慢走。先看矿坑湖的孔雀蓝，再去虎丘看树影与塔影。",
        spots: [
          {
            id: "emerald-lake",
            name: "翡翠湖",
            scenery: {
              title: "矿坑里，藏着一整片孔雀蓝",
              image: "./assets/images/suzhou-emerald-lake-01.jpg",
              alt: "苏州翡翠湖碧绿湖面、白色翡翠湖标志与矿坑岩壁",
              excerpt: "岩壁把湖围在中间，水从浅滩的青绿一直过渡到深处的孔雀蓝。",
              note: "矿坑湖 / 午后 / 岩壁",
              date: "2026.07.27—28",
              gallery: [
                {
                  image: "./assets/images/suzhou-emerald-lake-01.jpg",
                  thumb: "./assets/images/suzhou-emerald-lake-01-thumb.jpg",
                  alt: "苏州翡翠湖碧绿湖面、白色翡翠湖标志与矿坑岩壁",
                  caption: "翡翠湖"
                },
                {
                  image: "./assets/images/suzhou-emerald-lake-02.jpg",
                  thumb: "./assets/images/suzhou-emerald-lake-02-thumb.jpg",
                  alt: "翡翠湖浅滩透明的青绿色湖水与远处矿山岩壁",
                  caption: "一眼见底的蓝"
                },
                {
                  image: "./assets/images/suzhou-emerald-lake-03.jpg",
                  thumb: "./assets/images/suzhou-emerald-lake-03-thumb.jpg",
                  alt: "翡翠湖岸边树枝、碧绿湖水与山崖上的白色栏杆",
                  caption: "矿坑边的白栏杆"
                },
                {
                  image: "./assets/images/suzhou-emerald-lake-04.jpg",
                  thumb: "./assets/images/suzhou-emerald-lake-04-thumb.jpg",
                  alt: "翡翠湖清澈水面下的岩石与天空倒影",
                  caption: "水下的石头"
                },
                {
                  image: "./assets/images/suzhou-emerald-lake-05.jpg",
                  thumb: "./assets/images/suzhou-emerald-lake-05-thumb.jpg",
                  alt: "翡翠湖岸边岩壁上的绿色翡翠湖石刻",
                  caption: "翡翠湖石刻"
                },
                {
                  image: "./assets/images/suzhou-emerald-lake-06.jpg",
                  thumb: "./assets/images/suzhou-emerald-lake-06-thumb.jpg",
                  alt: "一只黑天鹅停在翡翠湖岸边的岩石与水浅滩之间",
                  caption: "岩石间的黑天鹅"
                },
                {
                  image: "./assets/images/suzhou-emerald-lake-07.jpg",
                  thumb: "./assets/images/suzhou-emerald-lake-07-thumb.jpg",
                  alt: "翡翠湖公园白墙上的黑色文字“愿你我 不被时间催促 不被世界定义”",
                  caption: "写在墙上的话"
                }
              ],
              paragraphs: [
                "走进翡翠湖的时候，先看到的是岩壁。石头一层一层围住水面，湖像被留在了矿坑的底部。",
                "岸边的水很浅，能看见底下的石头；再往中间走，颜色忽然变成很浓的孔雀蓝。<em>同是一片水，深浅之间像换了好几种颜色</em>。",
                "黑天鹅停在岩石边，白色栏杆挂在高处的山崖上。离开前，我们在白墙前停了停：<em>“愿你我，不被时间催促，不被世界定义。”</em>"
              ]
            }
          },
          {
            id: "huqiu",
            name: "虎丘",
            scenery: {
              title: "树影收住暑气，塔影探出云端",
              image: "./assets/images/suzhou-huqiu-01.jpg",
              alt: "虎丘林间的古建屋脊，斜生的树干与右侧巨石把画面框住",
              excerpt: "沿石阶往树荫深处走，剑池的题刻、养鹤涧的水声与云岩寺塔会依次出现。",
              note: "山林 / 剑池 / 云岩寺塔",
              date: "2026.07.28",
              gallery: [
                {
                  image: "./assets/images/suzhou-huqiu-01.jpg",
                  thumb: "./assets/images/suzhou-huqiu-01-thumb.jpg",
                  alt: "虎丘林间的古建屋脊，斜生的树干与右侧巨石把画面框住",
                  caption: "树影框住的屋脊"
                },
                {
                  image: "./assets/images/suzhou-huqiu-02.jpg",
                  thumb: "./assets/images/suzhou-huqiu-02-thumb.jpg",
                  alt: "虎丘白墙门洞前的弧形登山石阶与两侧绿植",
                  caption: "白墙与登山石阶"
                },
                {
                  image: "./assets/images/suzhou-huqiu-03.jpg",
                  thumb: "./assets/images/suzhou-huqiu-03-thumb.jpg",
                  alt: "虎丘浓密树影之间露出的一角黑瓦屋顶",
                  caption: "藏在林间的屋顶"
                },
                {
                  image: "./assets/images/suzhou-huqiu-04.jpg",
                  thumb: "./assets/images/suzhou-huqiu-04-thumb.jpg",
                  alt: "虎丘剑池石壁上的红色大字与写着别有洞天的圆拱门",
                  caption: "虎丘剑池"
                },
                {
                  image: "./assets/images/suzhou-huqiu-05.jpg",
                  thumb: "./assets/images/suzhou-huqiu-05-thumb.jpg",
                  alt: "剑池旁湿润的岩壁，绿色苔痕与红色剑池刻字倒映在水边",
                  caption: "苔痕与刻字"
                },
                {
                  image: "./assets/images/suzhou-huqiu-06.jpg",
                  thumb: "./assets/images/suzhou-huqiu-06-thumb.jpg",
                  alt: "虎丘养鹤涧的石块、浅水、绿树与写着养鹤涧的石刻",
                  caption: "养鹤涧"
                },
                {
                  image: "./assets/images/suzhou-huqiu-07.jpg",
                  thumb: "./assets/images/suzhou-huqiu-07-thumb.jpg",
                  alt: "虎丘盆景园里停在假山石上的小鸟，旁边是柏树盆景",
                  caption: "盆景园里的来客"
                },
                {
                  image: "./assets/images/suzhou-huqiu-08.jpg",
                  thumb: "./assets/images/suzhou-huqiu-08-thumb.jpg",
                  alt: "云岩寺塔从虎丘茂密的树冠上方露出，塔身砖石斑驳",
                  caption: "云岩寺塔"
                },
                {
                  image: "./assets/images/suzhou-huqiu-09.jpg",
                  thumb: "./assets/images/suzhou-huqiu-09-thumb.jpg",
                  alt: "从虎丘林间仰望云岩寺塔，前景枝叶在塔身周围围出一圈绿意",
                  caption: "树梢后的塔影"
                }
              ],
              paragraphs: [
                "七月的苏州很热，进虎丘以后，暑气却被树荫一层层收住。石阶往上，白墙、门洞和藤蔓先露出来，走路的速度也自然慢了下来。",
                "再往山里走，景色忽然变得很密：斜生的树干把画面分开，黑瓦屋顶藏在枝杈背后，右侧一块巨石压住边缘。<em>虎丘像是先替人把景框好，再让你往里走</em>。",
                "到剑池，红字从灰色岩壁上跳出来，“别有洞天”的洞门把游人吞进去。再往深处，水贴着石壁，绿色苔痕和红色刻字一起落在暗处。",
                "继续往上，养鹤涧有石头、浅水和小路，盆景园里一只鸟停在石上；等云岩寺塔从树梢后露出来，才觉得这一路始终有塔在引着。"
              ]
            }
          }
        ]
      },
      {
        id: "nanjing",
        number: "06",
        name: "南京",
        region: "江苏 · 中国",
        date: "2025.10",
        coords: "32°N · 119°E",
        intro:
          "南京适合沿着梧桐树慢慢走。拐进清凉山脚下的乌龙潭，看一池睡莲，也看附近居民如何过日子。",
        spots: [
          {
            id: "wulongtan",
            name: "乌龙潭公园",
            scenery: {
              title: "一池睡莲，把喧闹挡在门外",
              image: "./assets/images/nanjing-wulongtan-pink-lotus.jpg",
              alt: "南京乌龙潭公园水面上盛开的粉色睡莲",
              excerpt: "公园不大，水面却把树影、睡莲和来往的人声都收得很安静。",
              note: "水景 / 初秋 / 清凉山麓",
              gallery: [
                {
                  image: "./assets/images/nanjing-wulongtan-pink-lotus.jpg",
                  thumb: "./assets/images/nanjing-wulongtan-pink-lotus-thumb.jpg",
                  alt: "南京乌龙潭公园水面上盛开的粉色睡莲",
                  caption: "一池睡莲"
                },
                {
                  image: "./assets/images/nanjing-wulongtan-entrance.jpg",
                  thumb: "./assets/images/nanjing-wulongtan-entrance-thumb.jpg",
                  alt: "南京乌龙潭公园入口的石狮与园名立柱",
                  caption: "公园入口"
                },
                {
                  image: "./assets/images/nanjing-wulongtan-reflection.jpg",
                  thumb: "./assets/images/nanjing-wulongtan-reflection-thumb.jpg",
                  alt: "南京乌龙潭公园的柳树倒映在深绿色水面上",
                  caption: "柳树与倒影"
                },
                {
                  image: "./assets/images/nanjing-wulongtan-statue.jpg",
                  thumb: "./assets/images/nanjing-wulongtan-statue-thumb.jpg",
                  alt: "南京乌龙潭公园树荫下读书的石像",
                  caption: "树荫下的石像"
                },
                {
                  image: "./assets/images/nanjing-wulongtan-moorhen.jpg",
                  thumb: "./assets/images/nanjing-wulongtan-moorhen-thumb.jpg",
                  alt: "南京乌龙潭公园水面上游过的黑水鸡",
                  caption: "黑水鸡"
                },
                {
                  image: "./assets/images/nanjing-wulongtan-koi.jpg",
                  thumb: "./assets/images/nanjing-wulongtan-koi-thumb.jpg",
                  alt: "南京乌龙潭公园水草间游动的橙色锦鲤",
                  caption: "水草与锦鲤"
                },
                {
                  image: "./assets/images/nanjing-wulongtan-waterbirds.jpg",
                  thumb: "./assets/images/nanjing-wulongtan-waterbirds-thumb.jpg",
                  alt: "南京乌龙潭公园水面上游过的水鸟与锦鲤",
                  caption: "水面上的邻居"
                },
                {
                  image: "./assets/images/nanjing-wulongtan-lotus.jpg",
                  thumb: "./assets/images/nanjing-wulongtan-lotus-thumb.jpg",
                  alt: "南京乌龙潭公园水面上的白色睡莲与大片圆叶",
                  caption: "白色睡莲"
                }
              ],
              paragraphs: [
                "乌龙潭公园就在广州路边，挨着清凉山。进门走几步，一池水先出现在眼前：柳枝垂到水面，睡莲和圆叶一层层铺开。",
                "沿水走一圈，会遇见锦鲤、黑水鸡，也会遇见晒太阳和遛弯的附近居民。这里没有必须走完的路线，<em>城市就在墙外，园子里却像慢了半拍</em>。"
              ]
            }
          }
        ]
      }
    ],
    stories: [],
    fragments: [
      {
        chapter: "落日 / BEFORE DARK",
        caption: "枝桠间的落日",
        location: "SUN BETWEEN BRANCHES",
        image: "./assets/images/exhibition-afterglow-01.jpg",
        preview: "./assets/images/exhibition-afterglow-01-preview.webp",
        alt: "落日透过枯树枝桠，橙色天空与水面泛着金光",
        note: "太阳被枝桠切成许多小块，最后只剩水面上一道很长的金色。"
      },
      {
        caption: "芦苇荡收住最后一束光",
        location: "REEDS AT DUSK",
        image: "./assets/images/exhibition-afterglow-02.jpg",
        preview: "./assets/images/exhibition-afterglow-02-preview.webp",
        alt: "芦苇荡中间的一小片水面倒映落日，远处树影沉入暮色",
        note: "芦苇把湖面围成一个缺口，落日刚好落在缺口中央。"
      },
      {
        caption: "隔着芦苇看湖面",
        location: "THROUGH THE GRASS",
        image: "./assets/images/exhibition-afterglow-03.jpg",
        preview: "./assets/images/exhibition-afterglow-03-preview.webp",
        alt: "透过金色芦苇与枝叶望向湖面、游船和落日反光",
        note: "前景的芦苇压暗了画面，湖面反而像被点亮的另一层空间。"
      },
      {
        chapter: "余温 / AFTERGLOW",
        caption: "桥、塔与静水",
        location: "TWO SILHOUETTES",
        image: "./assets/images/exhibition-afterglow-04.jpg",
        preview: "./assets/images/exhibition-afterglow-04-preview.webp",
        alt: "暮色中的石拱桥、三层塔与平静水面上的倒影",
        note: "桥洞像一轮低下去的月亮，远处的塔替黄昏留住最后一条轮廓。"
      },
      {
        caption: "花影与马头墙",
        location: "BLOOM AGAINST THE WALL",
        image: "./assets/images/exhibition-afterglow-05.jpg",
        preview: "./assets/images/exhibition-afterglow-05-preview.webp",
        alt: "开满粉色花的树前，徽派马头墙与红灯笼被夕阳照亮",
        note: "花、墙和灯笼把同一束夕光分成了三种温度。"
      },
      {
        chapter: "归途 / GOING HOME",
        caption: "蓝调时刻的水边",
        location: "BLUE HOUR",
        image: "./assets/images/exhibition-afterglow-06.jpg",
        preview: "./assets/images/exhibition-afterglow-06-preview.webp",
        alt: "蓝调时刻的城市天际线、水面与在浅滩游玩的人群",
        note: "天已经蓝下来，水边的人还舍不得走，城市刚刚开始亮灯。"
      },
      {
        caption: "水里的孩子",
        location: "THE LAST BATHER",
        image: "./assets/images/exhibition-afterglow-07.jpg",
        preview: "./assets/images/exhibition-afterglow-07-preview.webp",
        alt: "水边禁止戏水牌旁，一个拿着水桶和铲子走进水里的孩子",
        note: "一块警告牌、一个孩子和水面的回声，让黄昏有了最后一个动作。"
      }
    ]
  },

  recommendations: {
    filters: [
      { value: "all", label: "全部" },
      { value: "read", label: "阅读" },
      { value: "site", label: "网站" },
      { value: "tool", label: "工具" },
      { value: "tweet", label: "推文" }
    ],
    items: [
      {
        type: "link",
        category: "read",
        categoryLabel: "阅读",
        date: "2026.10",
        title: "The Marginalian",
        description: "关于艺术、科学和如何好好生活的长期写作，适合留一个周末慢慢读。",
        url: "https://www.themarginalian.org/",
        source: "themarginalian.org"
      },
      {
        type: "link",
        category: "site",
        categoryLabel: "网站",
        date: "2026.09",
        title: "Are.na",
        description: "把图片、链接和想法连成自己的研究地图。很适合整理旅行与视觉灵感。",
        url: "https://www.are.na/",
        source: "are.na"
      },
      {
        type: "link",
        category: "tool",
        categoryLabel: "工具",
        date: "2026.09",
        title: "Milanote",
        description: "无限画布式的整理工具，我在上面拼旅行路线、内容草稿和零散的收藏。",
        url: "https://milanote.com/",
        source: "milanote.com"
      },
      {
        type: "link",
        category: "read",
        categoryLabel: "阅读",
        date: "2026.08",
        title: "The Creative Independent",
        description: "创作者的访谈和工作方法。每次没有灵感时，翻两篇就会想重新开始。",
        url: "https://thecreativeindependent.com/",
        source: "thecreativeindependent.com"
      },
      {
        type: "quote",
        category: "tweet",
        categoryLabel: "推文摘录",
        date: "SAVED",
        quote: "“Somewhere, something incredible is waiting to be known.”",
        attribution: "— CARL SAGAN",
        note: "常读常新"
      },
      {
        type: "link",
        category: "site",
        categoryLabel: "网站",
        date: "2026.07",
        title: "It's Nice That",
        description: "每天更新的创意网站，适合看看平面、摄影、插画和那些不太好分类的新东西。",
        url: "https://www.itsnicethat.com/",
        source: "itsnicethat.com"
      }
    ]
  }
};

