window.SITE_CONTENT = {
  categories: [
    {
      label: "旅游",
      english: "TRAVEL JOURNAL",
      description: "按城市整理每一段旅程，点进去看景点与城市味道。",
      meta: "04 DESTINATIONS",
      href: "./travel.html",
      image: "./assets/images/placeholder-water.svg",
      imageAlt: "柳州、济南、苏州与南京旅行笔记封面",
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
        { value: "03", label: "座城市" },
        { value: "07", label: "段景色" },
        { value: "06", label: "次回味" }
      ]
    },
    destinations: [
      {
        id: "liuzhou",
        number: "01",
        name: "柳州",
        region: "广西 · 中国",
        date: "2026.08",
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
        id: "jinan",
        number: "02",
        name: "济南",
        region: "山东 · 中国",
        date: "2026.06",
        coords: "36°N · 117°E",
        intro: "济南的好，藏在一泉一街之间。走累了，就坐下来吃一块把子肉。",
        spots: [
          {
            id: "baotu",
            name: "趵突泉",
            scenery: {
              title: "泉水一直在往上走",
              image: "./assets/images/placeholder-water.svg",
              alt: "趵突泉泉水的占位插画（待替换为实拍）",
              excerpt: "池水清得发亮，泉眼不停地把城市往上托。",
              note: "泉水 / 上午 / 老城",
              paragraphs: [
                "到趵突泉的时候，池边已经站了不少人。大家都不说话，只看水。",
                "泉眼一股一股往上翻，水声不大，却有一种很稳定的力量。那一刻我明白了，<em>济南的底气是从地下慢慢涌上来的</em>。"
              ]
            }
          },
          {
            id: "qushuiting",
            name: "曲水亭街",
            scenery: {
              title: "沿着水走，就会走到生活里",
              image: "./assets/images/placeholder-street.svg",
              alt: "曲水亭街水巷的占位插画（待替换为实拍）",
              excerpt: "一边是水，一边是人家，步子自然就慢下来。",
              note: "老街 / 午后 / 垂柳",
              paragraphs: [
                "曲水亭街适合没有目的地地走。水在脚边，柳枝垂下来，旧房子的墙被岁月磨得很软。",
                "有人在门口洗菜，有人坐在河边喝茶。旅行走到这里，<em>景点和日常之间那条线忽然就消失了</em>。"
              ]
            }
          }
        ],
        food: {
          note: "济南的饭桌不花哨，胜在实在。一块肉、一碗甜沫，就能把一天安顿好。",
          items: [
            {
              title: "把子肉",
              place: "老城",
              type: "家常",
              near: "趵突泉",
              image: "./assets/images/food-hero.jpg",
              alt: "把子肉与米饭的示意图片（占位）",
              note: "肉炖得酥，酱香里带一点甜。配一碗白饭，再浇一点汤汁，是很踏实的一顿。",
              repeat: "配米饭"
            },
            {
              title: "甜沫",
              place: "济南",
              type: "早餐",
              image: "./assets/images/food-breakfast.jpg",
              alt: "甜沫与早餐的示意图片（占位）",
              note: "名字叫甜，入口却是咸香的。小米面、花生、豆腐皮和粉条煮在一起，早起喝一碗，胃里很暖。",
              repeat: "早起再喝"
            }
          ]
        }
      },
      {
        id: "suzhou",
        number: "03",
        name: "苏州",
        region: "江苏 · 中国",
        date: "2026.04",
        coords: "31°N · 120°E",
        intro: "苏州适合慢慢走。园林看一扇窗，水巷听一段评弹，再吃一碗面。",
        spots: [
          {
            id: "zhuozhengyuan",
            name: "拙政园",
            scenery: {
              title: "一扇窗里，四季都在",
              image: "./assets/images/placeholder-water.svg",
              alt: "拙政园园林水景的占位插画（待替换为实拍）",
              excerpt: "园子不大，走进去却总觉得还有下一重景。",
              note: "园林 / 清晨 / 花窗",
              paragraphs: [
                "拙政园要早去。人少的时候，窗框、白墙和水面会自己组成一幅画。",
                "我在一扇花窗前停了很久。框里是竹影，框外是游廊，走两步又是另一种景。苏州的园林不是让你看完，而是<em>让你舍不得走快</em>。"
              ]
            }
          },
          {
            id: "pingjiang",
            name: "平江路",
            scenery: {
              title: "水巷边的慢生活",
              image: "./assets/images/placeholder-street.svg",
              alt: "平江路水巷的占位插画（待替换为实拍）",
              excerpt: "河在左手，老房子在右手，走累了就找一家小店坐下。",
              note: "水巷 / 傍晚 / 评弹",
              paragraphs: [
                "平江路的傍晚很好。河面开始反光，沿街的灯一盏一盏亮起来。",
                "我没有特意找评弹馆，只是顺着水走。走到桥边，听见一段唱腔从窗里漏出来，<em>整条街忽然有了声音</em>。"
              ]
            }
          }
        ],
        food: {
          note: "苏州的味道是细的。汤要清，面要挺，甜味也要收得住。",
          items: [
            {
              title: "苏式汤面",
              place: "苏州",
              type: "面食",
              near: "平江路",
              image: "./assets/images/food-noodles.jpg",
              alt: "苏式汤面的示意图片（占位）",
              note: "汤清，面细而挺，浇头另放在小碟里。先喝一口汤，再把面慢慢吃完，是苏州早晨的节奏。",
              repeat: "会再点"
            },
            {
              title: "生煎",
              place: "苏州",
              type: "小吃",
              image: "./assets/images/food-breakfast.jpg",
              alt: "生煎与早餐的示意图片（占位）",
              note: "底壳煎得脆，咬开先吸汤，再吃肉馅。趁热吃最好，配一碗薄粥刚好。",
              repeat: "趁热吃"
            }
          ]
        }
      },
      {
        id: "nanjing",
        number: "04",
        name: "南京",
        region: "江苏 · 中国",
        date: "2025.10",
        coords: "32°N · 119°E",
        intro:
          "南京适合沿着梧桐树慢慢走。抬头是城墙，低头是落叶，拐进清凉山脚下的乌龙潭，还能看一池睡莲。",
        spots: [
          {
            id: "zhongshanling",
            name: "中山陵",
            scenery: {
              title: "石阶尽头，是整座钟山",
              image: "./assets/images/placeholder-street.svg",
              alt: "中山陵梧桐大道与石阶的占位插画（待替换为实拍）",
              excerpt: "梧桐把路遮成一条长长的隧道，走过去，城市的声音就慢慢远了。",
              note: "钟山 / 秋日 / 梧桐",
              paragraphs: [
                "去中山陵的那天，梧桐叶已经黄了一半。路两边很高，枝叶在头顶合起来，光从缝隙里落下来。",
                "石阶比想象中长。走到上面回头看，树海一层一层铺开，<em>南京的秋天就藏在那些慢慢变色的叶子里</em>。"
              ]
            }
          },
          {
            id: "qinhuai",
            name: "秦淮河",
            scenery: {
              title: "灯影落在水面上",
              image: "./assets/images/placeholder-water.svg",
              alt: "秦淮河与夫子庙灯影的占位插画（待替换为实拍）",
              excerpt: "天黑以后，河边的灯一盏盏亮起来，画舫从桥下慢慢过去。",
              note: "秦淮河 / 夜晚 / 夫子庙",
              paragraphs: [
                "到夫子庙时天刚暗，秦淮河两岸的灯已经亮了。水面把灯影拉得很长，画舫从桥下过，桨声一下一下。",
                "街上人很多，但站在河边还是会安静下来。那一刻觉得，<em>南京的热闹和水是连在一起的</em>。"
              ]
            }
          },
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
        ],
        food: {
          note: "南京的味道偏咸鲜。一碗鸭血粉丝汤，再斩半只盐水鸭，刚好把走了一天的胃安顿下来。",
          items: [
            {
              title: "鸭血粉丝汤",
              place: "南京",
              type: "汤食",
              near: "夫子庙",
              image: "./assets/images/food-noodles.jpg",
              alt: "鸭血粉丝汤的示意图片（占位）",
              note: "汤是清的，鸭血嫩，粉丝滑，最后撒一把香菜和辣油。冬天走累了，坐下来喝完整碗，身上就暖了。",
              repeat: "还会再喝"
            },
            {
              title: "盐水鸭",
              place: "南京",
              type: "卤味",
              image: "./assets/images/food-hero.jpg",
              alt: "盐水鸭与卤味的示意图片（占位）",
              note: "皮薄，肉紧，咸味是慢慢出来的。切一盘配米饭，或者边走边吃，都很南京。",
              repeat: "打包带走"
            }
          ]
        }
      }
    ],
    stories: [],
    fragments: [
      {
        caption: "01 / 柳江边",
        location: "柳州 · 2026",
        image: "./assets/images/placeholder-water.svg",
        alt: "柳江与城市的占位插画"
      },
      {
        caption: "02 / 泉水与老街",
        location: "济南 · 2026",
        image: "./assets/images/placeholder-street.svg",
        alt: "济南泉水与老街的占位插画"
      },
      {
        caption: "03 / 水巷",
        location: "苏州 · 2026",
        image: "./assets/images/placeholder-water.svg",
        alt: "苏州水巷的占位插画"
      },
      {
        caption: "04 / 乌龙潭的倒影",
        location: "南京 · 2025",
        image: "./assets/images/nanjing-wulongtan-reflection.jpg",
        alt: "南京乌龙潭公园的柳树倒映在深绿色水面上"
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

