import { View, Text, Image } from "@tarojs/components";

let Today = new Date();
let tY = Today.getFullYear();
let tM = Today.getMonth();
let tD = Today.getDate();
let tD1 = tD;
let ybm1 = tM + 1;
let azz = new Date().valueOf();
let tD2 = new Date(azz + 1 * 24 * 60 * 60 * 1000).getDate();
let ybm2 = new Date(azz + 1 * 24 * 60 * 60 * 1000).getMonth() + 1;
let tD3 = new Date(azz + 2 * 24 * 60 * 60 * 1000).getDate();
let ybm3 = new Date(azz + 3 * 24 * 60 * 60 * 1000).getMonth() + 1;
let d2r = Math.PI / 180.0;
let width = "130";
let offsetx = 2;
let offsety = 16;
let snow = 0;
let snow2 = 0;
let cld;
let SukuDofs;

export type DayProp = {
  time?: any;
  text: any;
  color: any;
  background?: any;
};
export type DaysProp = { sObj: DayProp; lObj: DayProp }[];

const month2 = [
  "近代史上的元月：<br><br>《1789年1月----美国第一次大选,华盛顿当选为第一任总统》<br>《1912年1月1日----中华民国成立，孙中山任临时大总统，同期国民党成立》<br>《1924年1月----第一次国共合作》<br>《1932年1月28日----日本在上海发动“一.二八”事变》<br>《1933年1月----德国希特拉上台》<br>《1949年1月----淮海战役、平津战役解放军取得最后胜利》<br>《1976年1月8日----周恩来逝世》",
  "近代史上的2月：<br><br>《1848年2月----“共产党宣言”在欧洲发表》<br>《1848年2月----法国“二月革命”爆发》<br>《1923年2月----京汉铁路工人大罢工》<br>《1972年2月21日----尼克松到访中国》",
  "近代史上的3月：<br>《1925年3月12日----孙中山逝世》<br>《1932年3月----日本扶植清朝废帝溥仪，在东北建立伪“满洲国”》",
  "近代史上的4月：<br>《1861年4月----美国南北战争爆发》<br>《1911年4月----广州黄花冈起义》<br>《1949年4月23日----解放军解放南京,民国结束》<br>《1970年4月24日----中国成功发射第一颗人造卫星》<br>《1976年4月7日----华国锋任中共第一副主席》<br>《1984年4月6日----中国对外开放14个沿海城市》",
  "近代史上的5月：<br>《1841年5月29日----广州三元里民众抵抗英军入侵》<br>《1919年5月4日----“五四”运动爆发》<br>《1945年5月8日----德国签订无条件投降书》",
  "近代史上的6月：<br>《1840年6月----第一次鸦片战争爆发》<br>《1898年6月----“百日维新”开始》<br>《1913年6月----国民二次革命开始》<br>《1914年6月28日----萨拉热窝事件--第一次世界大战爆发》<br>《1944年6月6日----英美盟军登陆诺曼底》<br>《1950年6月25日----朝鲜战争爆发》",
  "近代史上的7月：<br>《1776年7月4日----《独立宣言》发表，美国成立》<br>《1921年7月----中国共产党成立》<br>《1937年7月7日----日本发动芦沟桥事变》<br>《1946年7月----中国爆发全面内战》<br>《1953年7月26日----朝鲜战争结束，形成南北对峙局面》<br>《1976年7月6日----朱德逝世》<br>《1997年7月----中国收回香港主权》",
  "近代史上的8月：<br>《1789年8月----法国《人权宣言》发布》<br>《1842年8月----清政府割让香港》<br>《1894年8月1日----清政府对日宣战，甲午战争爆发》<br>《1905年8月----中国同盟会成立》<br>《1927年8月1日----“八一”南昌起义》<br>《1945年8月6日、9日----美国在日本广岛、长崎第一次使用原子弹》<br>《1945年8月14日----日本宣布无条件投降》<br>《1966年8月18日----毛泽东在天安门接见红卫兵》",
  "近代史上的9月：<br>《1909年9月----中国第一条自行设计的“京张”铁路开通》<br>《1915年9月----中国新文化运动开始》<br>《1922年9月----安源路矿工人大罢工》<br>《1931年9月18日----日本在沈阳发动“九.一八”事变》<br>《1939年9月3日第二次世界大战全面爆发》<br>《1945年9月2日----日本签订无条件投降书》<br>《1976年9月9日----毛泽东逝世》<br>《1984年9月26日----中英发表关于香港问题的联合声明》",
  "近代史上的10月：<br>《1856年10月----英法联军火烧圆明园；同月清政府割让九龙半岛》<br>《1911年10月10日----武昌起义，辛亥革命开始》<br>《1934年10月----红军开始二万五千里长征》<br>《1949年10月1日----中华人民共和国成立》<br>《1950年10月25日----中国人民志愿军入朝参加抗美战争》<br>《1951年10月26日----解放军进藏，西藏和平解放》<br>《1957年10月4日----前苏联将世界上第一颗人造卫星送上太空》<br>《1976年10月6日----“四人帮”受审》",
  "近代史上的11月：<br>《1798年11月9日----法国拿破伦发动“雾月政变”，拿破伦时代开始》<br>《1917年11月7日----“十月革命”胜利苏联成立》<br>《1943年11月----苏、美、英三大巨头举行德克兰会议》<br>《1948年11月----辽沈战役结束,淮海战役开始》<br>《1969年11月12日----刘少奇在开封逝世》",
  "近代史上的12月：<br>《1936年12月12日----西安事变》<br>《1937年12月13日----南京大屠杀》<br>《1941年12月8日----太平洋战争爆发》",
];

const Sukuyou = [
  "东方",
  "东方",
  "东方",
  "东方",
  "东方",
  "东方",
  "东方",
  "北方",
  "北方",
  "北方",
  "北方",
  "北方",
  "北方",
  "北方",
  "西方",
  "西方",
  "西方",
  "西方",
  "西方",
  "西方",
  "西方",
  "南方",
  "南方",
  "南方",
  "南方",
  "南方",
  "南方",
  "南方",
];
const Sukuyou2 = [
  "角木蛟-吉",
  "亢金龙-凶",
  "氐土貉-凶",
  "房日兔-吉",
  "心月狐-凶",
  "尾火虎-吉",
  "箕水豹-吉",
  "斗木獬-吉",
  "牛金牛-凶",
  "女土蝠-凶",
  "虚日鼠-凶",
  "危月燕-凶",
  "室火猪-吉",
  "壁水貐-吉",
  "奎木狼-凶",
  "娄金狗-吉",
  "胃土雉-吉",
  "昴日鸡-凶",
  "毕月乌-吉",
  "觜火猴-凶",
  "参水猿-凶",
  "井木犴-吉",
  "鬼金羊-凶",
  "柳土獐-凶",
  "星日马-凶",
  "张月鹿-吉",
  "翼火蛇-凶",
  "轸水蚓-吉",
];

const Sukuyou3 = [
  "角星造作主荣昌，外进田财及女郎，嫁娶婚姻出贵子，文人及第见君王，惟有埋葬不可用，叁年之後主瘟疫，起工修建坟基地，当前立见主人凶。<br><br>释义：<br>角星造作则可荣昌，可置田产及早办喜事。如果用角星来办嫁娶则可出贵子，读书人的功名可一帆风顺。但是不可用角星行埋葬，否则叁年之後有瘟疫。如果用角星起工修建坟墓或地基，则主人不利。",
  "亢星造作长房当，十日之中主有殃，田地消磨官失职，接运定是虎狼伤，嫁娶婚姻用此日，儿孙新妇守空房，埋葬若还用此日，当时害祸主重伤。<br><br>释义：<br>亢星造作则长房在十日之中有灾殃，祖田不保且会失去官职，及会受小人所伤。如果用亢星行嫁娶，则儿孙新妇要守空房。如果用亢星行埋葬则有灾祸、重伤。",
  "氐星造作主灾凶，费尽田园仓库空，埋葬不可用此日，悬绳吊颈祸重重，若是婚姻离别散，夜招浪子入房中，行船必定遭沉没，更生聋哑子孙穷。<br><br>释义：<br>氐星造作会有灾殃，田园财产一时空。用氐星进行埋葬，则有人会悬吊自缢、灾祸接二连叁。用氐星行婚礼则会离别、妇人不贞，航行又不利，更会生产聋哑的子孙，而闹得家庭更穷。",
  "房星造作田园进，钱财牛马遍山岗，更招外处田庄宅，荣华富贵福禄康，埋葬若然用此日，高官进职拜君王，嫁娶嫦娥至月殿，叁年抱子至朝堂。<br><br>释义：<br>房星造作则财源滚滚来，享受荣华富贵、有福禄，并且身体健康。用房星行埋葬则仕途平稳，嫁娶用此，日婚姻美满，叁年得贵子。",
  "心星造作大为凶，更遭刑讼狱囚中，忤逆官非宅产退，埋葬卒暴死相从，婚姻若是用此日，子死儿亡泪满胸，叁年之内连遭祸，事事教君没始终。<br><br>释义：<br>心星造作则大凶，有囚狱之灾，忤逆长辈、惹官非，损失宅产。埋葬则大凶，用於婚姻则伤子，凶事接二连叁，令人寝食难安。",
  "尾星造作主天恩，富贵荣华福禄增，招财进宝兴家宅，和合婚姻贵子孙，埋葬若能依此日，男清女正子孙兴，开门放水招田宅，代代公侯远播名。<br><br>释义：<br>尾星造作可荣华富贵、福禄、财源滚滚而来。行婚姻则大吉利、子孙有利，有贵气。用尾星行埋葬则子孙兴旺，地理方面的开门放水则财源滚滚而来，并且有名望。",
  "箕星造作主高强，岁岁年年大吉昌，埋葬修坟大吉利，田蚕牛马遍山岗，开门放水招田宅，箧满金银谷满仓，福荫高官加禄位，六亲丰荣乐安康。<br><br>释义：<br>箕星造作可年年大吉昌，埋葬修坟也大吉利，风水方面的开门放水，则可升官，使财源滚滚而来，六亲丰足，生活过得快乐平安且身体健康，仕途平稳。",
  "斗星造作主招财，文武官员位鼎台，田宅家财千万进，坟堂修辑贵富来，开门放水招牛马，旺蚕男女主和谐，遇此吉宿来照护，时支福庆永无灾。<br><br>释义：<br>斗星造作可招财、有利於仕途，家业欣欣向荣。修辑坟地可招富贵，开门放水则有进财，可使家庭和睦，有福而无灾。",
  "牛星造作主灾危，九横叁灾不可推，家宅不安人口退，田蚕不利主人衰，嫁娶婚姻皆自损，金银财谷渐无之，若是开门并放水，牛猪羊马亦伤悲。<br><br>释义：<br>牛星造作有灾厄，天灾横祸不能免，家庭不安而且伤人口，事业不利。如果行婚姻则不利，钱财渐退，假若开门放水则不利六畜。",
  "女星造作损婆娘，兄弟相嫌似虎狼，埋葬生灾逢鬼怪，颠邪疾病主瘟惶，为事遭官财失散，泻利留连不可当，开门放水用此日，全家财散主离乡。<br><br>释义：<br>女星造作则不利妇女，恐会损人口。兄弟互相猜忌，感情不和睦，好比水火不能相容。如果行埋葬则容易招鬼怪，有怪病发生，作事易惹事生非而失财。要是开门放水，则家庭破散，离乡别井。",
  "虚星造作主灾殃，男女孤眠不一双，内乱风声无礼节，儿孙媳妇伴人床，开门放水遭灾祸，虎咬蛇伤又卒亡，叁叁五五连年病，家破人亡不可当。<br><br>释义：<br>虚星造作则有灾殃，男女相克无法成双。家庭不和睦，而且儿孙媳妇都不守节操，甚至乱了伦理。假如开门放水更有灾祸，损人口，有伤亡，疾病接二连叁，直至家破人亡。",
  "危星不可造高楼，自遭刑吊见血光，叁年孩子遭水厄，後生出外永不还，埋葬若还逢此日，周年百日取高堂，叁年两载一悲伤，开门放水到官堂。<br><br>释义：<br>危星造作则有刑吊及血光之灾，叁年内孩子会遭水厄，损人口，年青出外不归家。若行埋葬则更悲伤，周年或百日年长的有灾厄，要是开门放水，则会上官堂 (打官司) 。",
  "室星修造进田牛，儿孙代代近王侯，家贵荣华天上至，寿如彭祖八千秋，开门放水招财帛，和合婚姻生贵儿，埋葬若能依此日，门庭兴旺福无休。<br><br>释义：<br>室星修造则大吉利，富贵荣华，而且财源广进，长寿。开门放水则可招财进宝，行婚礼则可生贵子。要是行埋葬则子孙兴旺、福禄无穷。",
  "璧星造作主增财，丝帛大熟福滔天，奴婢自来人口进，开门放水出英贤，埋葬招财官品进，家中诸事乐陶然，婚姻吉利主贵子，早播名誉着祖鞭。<br><br>释义：<br>璧星造作可招进财、财源广进，事业有成。开打放水则後代贤能，埋葬则可招财，并且有利於仕途，家庭生活幸福美满。如果行婚礼则大吉利，早生贵子而有名声。",
  "奎星造作得祯祥，家内荣和大吉昌，若是埋葬阴卒死，当年定主两叁伤，看看军令刑伤到，重重官事主瘟惶，开门放水遭灾祸，叁年两次损儿郎。<br><br>释义：<br>奎星造作算得了祯祥，可使家内繁荣而和睦。但是不可用来埋葬，否则一年内必有伤亡，而且有官事及怪病发生。要是开门放水则有灾祸，对儿子不利。",
  "娄星修造起门庭，财旺家和事事兴，外进钱财百日进，一家兄弟播高名，婚姻进益生贵子，玉帛金银箱满盈，放水开门皆吉利，男荣女贵寿康宁。<br><br>释义：<br>娄星造作则可使家业兴旺，财源广进，兄弟和睦有名望。行婚礼则早生贵子，要是开门放水则身体健康而长寿，经济很好。",
  "胃星造作事如何，家贵荣华喜气多，埋葬贵临官禄位，夫妇齐眉永保康，婚姻遇此家富贵，叁灾九祸不逢他，从此门前多吉庆，儿孙代代拜金阶。<br><br>释义：<br>胃星造作则荣华富贵，喜气洋洋。行埋葬则有利於仕途，夫妇可白首偕老。行婚礼则可使家内富贵，儿孙代代有名望。",
  "昴星造作进田牛，埋葬官灾不得休，重丧二日叁人死，尽卖田园不记增，开门放水招灾祸，叁岁孩儿白了头，婚姻不可逢此日，死别生离是可愁。<br><br>释义：<br>昴星造作可使家业兴盛。但埋葬则常有官灾，且会继续死人，更会变卖田产。开门放水则会招灾祸，孩童会得怪病，行婚礼则更悲哀，会有死别生离。",
  "毕星造作主光前，买得田园有馀钱，埋葬此日添官职，田粮大熟永丰年，开门放水多吉庆，合家人口得安然，婚姻若得逢此日，生得孩儿福寿全。<br><br>释义：<br>毕星造作则财源广进，行埋葬则有利於仕途，事业兴旺，开门放水，则合家欢乐，行婚礼则早生贵子而福寿双全。",
  "觜星造作有徒刑，叁年必定主伶丁，埋葬卒死多因此，取定寅年使杀人，叁丧不止皆由此，一人药毒二人身，家门田地皆退败，仓库金银化作尘。<br><br>释义：<br>觜星造作则有刑害，会变成伶仃。假若行埋葬则容易有暴死的现象，多数应於寅年，灾祸不断，直至使田地退散而破家。",
  "参星造作旺人家，文星照耀大光华，只因造作田财旺，埋葬招疾哭黄沙，开门放水加官职，房房子孙见田加，婚姻许遁遭刑克，男女朝开幕落花。<br><br>释义：<br>参星造作可旺人家，文星高照，并对田产有利，但是行埋葬则大凶。开门放水则有利於仕途，与田产及子孙兴旺。但是行婚礼则大凶，会遭刑克，感情无法和睦。",
  "井星造作旺粮田，金榜题名第一光，埋葬须防惊卒死，狂颠风疾入黄泉，开门放水招财帛，牛马猪羊旺莫言，贵人田塘来入宅，儿孙兴旺有馀钱。<br><br>释义：<br>井星造作则财源广进，可金榜题名。埋葬则不利，容易得怪病而命归黄泉。开门放水可招财进宝，贵人重重，儿孙兴旺。",
  "鬼星起造卒人亡，堂前不见主人郎，埋葬此日官禄至，儿孙代代近君王，开门放水须伤死，嫁娶夫妻不久长，修土建墙伤产女，手扶双女泪汪汪。<br><br>释义：<br>鬼星造作则大凶，有伤人口。埋葬用此日则可加冠进禄，对儿孙的仕途有利，但是开门放水则有伤人口，要是行婚礼夫修土建墙也大凶。",
  "柳星造作主遭官，昼夜偷闭不暂安，埋葬瘟惶多疾病，田园退尽守冬寒，开门放水遭聋瞎，腰佗背曲似弓弯，更有捧刑宜谨慎，妇人随客走盘桓，<br><br>释义：<br>柳星造作则有官事，无日安宁，埋葬则多疾病，并且田产退败。开门放水则会产生耳聋及瞎眼的毛病，甚至弯背，严重的话甚至遭刑打，妇人不守妇道。",
  "星宿日好造新房，进职加官近帝王，不可埋葬并放水，凶星临位女人亡，生离死别无心恋，要自归休别嫁郎，孔子九曲殊难度，放水开门天命伤。<br><br>释义：<br>星星造作则有利於仕途。但不可埋葬与放水，否则大凶，会遭生离死别之祸。",
  "张星日好造龙轩，年年并见进庄田，埋葬不久升官职，代代为官近帝前，开门放水招财帛，婚姻和合福绵绵，田粮人满仓库满，百般顺意自安然。<br><br>释义：<br>张星造作则财源广进，埋葬则有利於仕途。开门放水则可招财进宝，行婚礼则夫妻恩爱和合福绵绵，事事如意，安然自得。",
  "翼星不利架高堂，叁年二载见瘟惶，埋葬若还逢此日，子孙必定走他乡，婚姻此日不宜利，归家定是不相当，开门放水家须破，少女恋花贪外郎。<br><br>释义：<br>翼星修造则容易得怪病，要是行埋葬则子孙远走他乡。行婚礼则不利，妇女不守妇道。开门放水则家破，少女会淫奔。",
  "轸星临水造龙宫，代代为官受皇封，富贵荣华增受禄，库满仓盈自昌隆，埋葬文昌来照助，宅舍安宁不见凶，更有为官沾帝宠，婚姻龙子入龙宫。<br><br>释义：<br>轸星造作则有利於仕途，荣华富贵，增福寿，财源广进。行埋葬则宅舍安宁。",
];

const Sukuyou4 = [
  "角",
  "亢",
  "氐",
  "房",
  "心",
  "尾",
  "箕",
  "斗",
  "牛",
  "女",
  "虚",
  "危",
  "室",
  "壁",
  "奎",
  "娄",
  "胃",
  "昴",
  "毕",
  "觜",
  "参",
  "井",
  "鬼",
  "柳",
  "星",
  "张",
  "翼",
  "轸",
];

const KyuuseiName3 = [
  "门中太乙明，星官号贪狼，赌彩财喜旺，婚姻大吉昌。<br>出入无阻挡，参谒见贤良，此行三五里，黑衣别阴阳。",
  "门前见摄提，百事必忧疑，相生犹自可，相克祸必临。<br>死门并相会，老妇哭悲啼，求谋并吉事，尽皆不相宜。<br>只可藏隐遁，若动伤身疾。",
  "出入会轩辕，凡事必缠牵，相生全不美，相克更忧煎。<br>远行多不利，博彩尽输钱，九天玄女法，句句不虚言。",
  "招摇号木星，当之事莫行，相克行人阻，阴人口舌迎。<br>梦寐多惊惧，屋响斧自鸣，阴阳消息理，万法弗违情。",
  "五鬼为天符，当门阴女谋，相克无好事，行路阻中途。<br>走失难寻觅，道逢有尼姑，此星当门值，万事有灾除。",
  "神光跃青龙，财气喜重重，投入有酒食，赌彩最兴隆。<br>更逢相生旺，休言克破凶，见贵安营寨，万事总吉同。",
  "吾将为咸池，当之尽不宜，出入多不利，相克有灾情。<br>赌彩全输尽，求财空手回，仙人真妙语，愚人莫与知，<br>动用虚惊退，反复逆风吹。",
  "坐临太阴星，百祸不相侵，求谋悉成就，知交有觅寻。<br>回风归来路，恐有殃伏起，密语中记取，慎乎莫轻行。",
  "迎来天乙星，相逢百事兴，运用和合庆，茶酒喜相迎。<br>求谋并嫁娶，好合有天成。祸福如神验，吉凶甚分明。",
];

/**
 * 自动引入当前文件夹下所有module
 * require.context(directory, useSubdirectories = false, regExp = /^.//);
 */
const modulesFiles = require.context("./images", false, /.gif$/);
const images = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^.\/(.*)\.gif/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value;
  return modules;
}, {});

const nStr2 = ["初", "十", "廿", "卅", "　"];

const sFtv = [
  "0101*元旦",
  "0214 情人节",
  "0308 妇女节",
  "0312 植树节",
  "0315 消费者权益日",
  "0401 愚人节",
  "0501 劳动节",
  "0504 青年节",
  "0512 护士节",
  "0601 儿童节",
  "0701 建党节 香港回归纪念日",
  "0801 建军节",
  "0909 毛泽东逝世纪念日",
  "0910 教师节",
  "0928 孔子诞辰",
  "1001*国庆节",
  "1006 老人节",
  "1024 联合国日",
  "1031 万圣节（鬼节）",
  "1112 孙中山诞辰纪念日",
  "1220 澳门回归纪念日",
  "1224*平安夜",
  "1225*圣诞节",
  "1226 毛泽东诞辰纪念日",
];
const lFtv = [
  "0101*春节",
  "0107*人日",
  "0115*元宵节",
  "0125 填仓节",
  "0126 生菜会",
  "0202 龙头节",
  "0206 东华帝君诞",
  "0215 涅槃节",
  "0219 观音诞",
  "0323 妈祖诞、天后诞",
  "0408 牛王诞",
  "0505*端午节",
  "0508 龙母诞",
  "0520 分龙节",
  "0606 姑姑节",
  "0616 鲁班节",
  "0624 关帝节",
  "0630 围香节",
  "0707 七夕情人节",
  "0715 中元节(鬼节)",
  "0802 灶君诞",
  "0827 先师诞",
  "0815*中秋节",
  "0909 重阳节",
  "1001 祭祖节、祀靴节",
  "1025 感天上帝诞",
  "1208 腊八节",
  "1220 鲁班公诞",
  "1224 小年（祀灶）",
  "0100*除夕",
];
const wFtv = [
  "0231 总统日",
  "0520 母亲节",
  "0531 胜利日",
  "0630 父亲节",
  "0716 合作节",
  "0730 被奴役国家周",
  "0911 西方劳动节",
  "1011 世界住房日",
  "1021 美国哥伦布纪念日",
  "1144 感恩节",
];

const solarTerm = [
  "小寒",
  "大寒",
  "立春",
  "雨水",
  "惊蛰",
  "春分",
  "清明",
  "谷雨",
  "立夏",
  "小满",
  "芒种",
  "夏至",
  "小暑",
  "大暑",
  "立秋",
  "处暑",
  "白露",
  "秋分",
  "寒露",
  "霜降",
  "立冬",
  "小雪",
  "大雪",
  "冬至[冬节]",
];

const dayglk = ["寅", "卯", "巳", "午", "巳", "午", "申", "酉", "亥", "子"];

const jcName0 = [
  "建",
  "除",
  "满",
  "平",
  "定",
  "执",
  "破",
  "危",
  "成",
  "收",
  "开",
  "闭",
];
const jcName1 = [
  "闭",
  "建",
  "除",
  "满",
  "平",
  "定",
  "执",
  "破",
  "危",
  "成",
  "收",
  "开",
];
const jcName2 = [
  "开",
  "闭",
  "建",
  "除",
  "满",
  "平",
  "定",
  "执",
  "破",
  "危",
  "成",
  "收",
];
const jcName3 = [
  "收",
  "开",
  "闭",
  "建",
  "除",
  "满",
  "平",
  "定",
  "执",
  "破",
  "危",
  "成",
];
const jcName4 = [
  "成",
  "收",
  "开",
  "闭",
  "建",
  "除",
  "满",
  "平",
  "定",
  "执",
  "破",
  "危",
];
const jcName5 = [
  "危",
  "成",
  "收",
  "开",
  "闭",
  "建",
  "除",
  "满",
  "平",
  "定",
  "执",
  "破",
];
const jcName6 = [
  "破",
  "危",
  "成",
  "收",
  "开",
  "闭",
  "建",
  "除",
  "满",
  "平",
  "定",
  "执",
];
const jcName7 = [
  "执",
  "破",
  "危",
  "成",
  "收",
  "开",
  "闭",
  "建",
  "除",
  "满",
  "平",
  "定",
];
const jcName8 = [
  "定",
  "执",
  "破",
  "危",
  "成",
  "收",
  "开",
  "闭",
  "建",
  "除",
  "满",
  "平",
];
const jcName9 = [
  "平",
  "定",
  "执",
  "破",
  "危",
  "成",
  "收",
  "开",
  "闭",
  "建",
  "除",
  "满",
];
const jcName10 = [
  "满",
  "平",
  "定",
  "执",
  "破",
  "危",
  "成",
  "收",
  "开",
  "闭",
  "建",
  "除",
];
const jcName11 = [
  "除",
  "满",
  "平",
  "定",
  "执",
  "破",
  "危",
  "成",
  "收",
  "开",
  "闭",
  "建",
];

const zrxName1 = [
  <>
    青龙<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    明堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天刑<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    朱雀<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    金匮<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天德<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    白虎<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玉堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天牢<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玄武<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    司命<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    勾陈<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
];
const zrxName2 = [
  <>
    司命<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    勾陈<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    青龙<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    明堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天刑<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    朱雀<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    金匮<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天德<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    白虎<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玉堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天牢<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玄武<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
];
const zrxName3 = [
  <>
    天牢<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玄武<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    司命<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    勾陈<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    青龙<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    明堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天刑<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    朱雀<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    金匮<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天德<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    白虎<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玉堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
];
const zrxName4 = [
  <>
    白虎<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玉堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天牢<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玄武<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    司命<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    勾陈<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    青龙<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    明堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天刑<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    朱雀<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    金匮<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天德<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
];
const zrxName5 = [
  <>
    金匮<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天德<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    白虎<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玉堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天牢<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玄武<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    司命<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    勾陈<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    青龙<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    明堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天刑<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    朱雀<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
];
const zrxName6 = [
  <>
    天刑<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    朱雀<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    金匮<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天德<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    白虎<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玉堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天牢<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玄武<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    司命<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    勾陈<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    青龙<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    明堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
];
const zrxName7 = [
  <>
    青龙<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    明堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天刑<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    朱雀<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    金匮<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天德<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    白虎<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玉堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天牢<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玄武<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    司命<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    勾陈<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
];
const zrxName8 = [
  <>
    司命<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    勾陈<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    青龙<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    明堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天刑<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    朱雀<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    金匮<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天德<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    白虎<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玉堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天牢<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玄武<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
];
const zrxName9 = [
  <>
    天牢<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玄武<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    司命<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    勾陈<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    青龙<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    明堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天刑<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    朱雀<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    金匮<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天德<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    白虎<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玉堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
];
const zrxName10 = [
  <>
    白虎<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玉堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天牢<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玄武<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    司命<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    勾陈<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    青龙<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    明堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天刑<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    朱雀<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    金匮<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天德<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
];
const zrxName11 = [
  <>
    金匮<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天德<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    白虎<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玉堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天牢<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玄武<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    司命<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    勾陈<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    青龙<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    明堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天刑<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    朱雀<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
];
const zrxName12 = [
  <>
    天刑<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    朱雀<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    金匮<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天德<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    白虎<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玉堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    天牢<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    玄武<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    司命<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    勾陈<Text style={{ color: "0000A0" }}>(黑道日)</Text>
  </>,
  <>
    青龙<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
  <>
    明堂<Text style={{ color: "#FF8C1A" }}>(黄道日)</Text>
  </>,
];

const solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const Gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const Gan2 = [
  "甲不开仓",
  "乙不栽植",
  "丙不修灶",
  "丁不剃头",
  "戊不受田",
  "己不破券",
  "庚不经络",
  "辛不合酱",
  "壬不泱水",
  "癸不词讼",
];
const Gan3 = [
  "甲子 乙丑 丙寅 丁卯 戊辰 己巳 庚午 辛未 壬申 癸酉 甲戌 乙亥",
  "丙子 丁丑 戊寅 己卯 庚辰 辛巳 壬午 癸未 甲申 乙酉 丙戌 丁亥",
  "戊子 己丑 庚寅 辛卯 壬辰 癸巳 甲午 乙未 丙申 丁酉 戊戌 己亥",
  "庚子 辛丑 壬寅 癸卯 甲辰 乙巳 丙午 丁未 戊申 己酉 庚戌 辛亥",
  "壬子 癸丑 甲寅 乙卯 丙辰 丁巳 戊午 己未 庚申 辛酉 壬戌 癸亥",
  "甲子 乙丑 丙寅 丁卯 戊辰 己巳 庚午 辛未 壬申 癸酉 甲戌 乙亥",
  "丙子 丁丑 戊寅 己卯 庚辰 辛巳 壬午 癸未 甲申 乙酉 丙戌 丁亥",
  "戊子 己丑 庚寅 辛卯 壬辰 癸巳 甲午 乙未 丙申 丁酉 戊戌 己亥",
  "庚子 辛丑 壬寅 癸卯 甲辰 乙巳 丙午 丁未 戊申 己酉 庚戌 辛亥",
  "壬子 癸丑 甲寅 乙卯 丙辰 丁巳 戊午 己未 庚申 辛酉 壬戌 癸亥",
];
const Gan4 = [
  <>
    <Text style={{ color: "#FF8C1A" }}>金匮</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>天德</Text>{" "}
    <Text style={{ color: "#0000A0" }}>白虎</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>玉堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天牢</Text>{" "}
    <Text style={{ color: "#0000A0" }}>玄武</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>司命</Text>{" "}
    <Text style={{ color: "#0000A0" }}>勾陈</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>青龙</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>明堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天刑</Text>{" "}
    <Text style={{ color: "#0000A0" }}>朱雀</Text>
  </>,
  <>
    <Text style={{ color: "#0000A0" }}>天刑</Text>{" "}
    <Text style={{ color: "#0000A0" }}>朱雀</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>金匮</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>天德</Text>{" "}
    <Text style={{ color: "#0000A0" }}>白虎</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>玉堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天牢</Text>{" "}
    <Text style={{ color: "#0000A0" }}>玄武</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>司命</Text>{" "}
    <Text style={{ color: "#0000A0" }}>勾陈</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>青龙</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>明堂</Text>
  </>,
  <>
    <Text style={{ color: "#FF8C1A" }}>青龙</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>明堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天刑</Text>{" "}
    <Text style={{ color: "#0000A0" }}>朱雀</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>金匮</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>天德</Text>{" "}
    <Text style={{ color: "#0000A0" }}>白虎</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>玉堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天牢</Text>{" "}
    <Text style={{ color: "#0000A0" }}>玄武</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>司命</Text>{" "}
    <Text style={{ color: "#0000A0" }}>勾陈</Text>
  </>,
  <>
    <Text style={{ color: "#FF8C1A" }}>司命</Text>{" "}
    <Text style={{ color: "#0000A0" }}>勾陈</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>青龙</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>明堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天刑</Text>{" "}
    <Text style={{ color: "#0000A0" }}>朱雀</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>金匮</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>天德</Text>{" "}
    <Text style={{ color: "#0000A0" }}>白虎</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>玉堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天牢</Text>{" "}
    <Text style={{ color: "#0000A0" }}>玄武</Text>
  </>,
  <>
    <Text style={{ color: "#0000A0" }}>天牢</Text>{" "}
    <Text style={{ color: "#0000A0" }}>玄武</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>司命</Text>{" "}
    <Text style={{ color: "#0000A0" }}>勾陈</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>青龙</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>明堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天刑</Text>{" "}
    <Text style={{ color: "#0000A0" }}>朱雀</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>金匮</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>天德</Text>{" "}
    <Text style={{ color: "#0000A0" }}>白虎</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>玉堂</Text>
  </>,
  <>
    <Text style={{ color: "#0000A0" }}>白虎</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>玉堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天牢</Text>{" "}
    <Text style={{ color: "#0000A0" }}>玄武</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>司命</Text>{" "}
    <Text style={{ color: "#0000A0" }}>勾陈</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>青龙</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>明堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天刑</Text>{" "}
    <Text style={{ color: "#0000A0" }}>朱雀</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>金匮</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>天德</Text>
  </>,
  <>
    <Text style={{ color: "#FF8C1A" }}>金匮</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>天德</Text>{" "}
    <Text style={{ color: "#0000A0" }}>白虎</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>玉堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天牢</Text>{" "}
    <Text style={{ color: "#0000A0" }}>玄武</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>司命</Text>{" "}
    <Text style={{ color: "#0000A0" }}>勾陈</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>青龙</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>明堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天刑</Text>{" "}
    <Text style={{ color: "#0000A0" }}>朱雀</Text>
  </>,
  <>
    <Text style={{ color: "#0000A0" }}>天刑</Text>{" "}
    <Text style={{ color: "#0000A0" }}>朱雀</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>金匮</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>天德</Text>{" "}
    <Text style={{ color: "#0000A0" }}>白虎</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>玉堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天牢</Text>{" "}
    <Text style={{ color: "#0000A0" }}>玄武</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>司命</Text>{" "}
    <Text style={{ color: "#0000A0" }}>勾陈</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>青龙</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>明堂</Text>
  </>,
  <>
    <Text style={{ color: "#FF8C1A" }}>青龙</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>明堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天刑</Text>{" "}
    <Text style={{ color: "#0000A0" }}>朱雀</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>金匮</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>天德</Text>{" "}
    <Text style={{ color: "#0000A0" }}>白虎</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>玉堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天牢</Text>{" "}
    <Text style={{ color: "#0000A0" }}>玄武</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>司命</Text>{" "}
    <Text style={{ color: "#0000A0" }}>勾陈</Text>
  </>,
  <>
    <Text style={{ color: "#FF8C1A" }}>司命</Text>{" "}
    <Text style={{ color: "#0000A0" }}>勾陈</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>青龙</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>明堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天刑</Text>{" "}
    <Text style={{ color: "#0000A0" }}>朱雀</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>金匮</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>天德</Text>{" "}
    <Text style={{ color: "#0000A0" }}>白虎</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>玉堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天牢</Text>{" "}
    <Text style={{ color: "#0000A0" }}>玄武</Text>
  </>,
  <>
    <Text style={{ color: "#0000A0" }}>天牢</Text>{" "}
    <Text style={{ color: "#0000A0" }}>玄武</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>司命</Text>{" "}
    <Text style={{ color: "#0000A0" }}>勾陈</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>青龙</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>明堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天刑</Text>{" "}
    <Text style={{ color: "#0000A0" }}>朱雀</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>金匮</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>天德</Text>{" "}
    <Text style={{ color: "#0000A0" }}>白虎</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>玉堂</Text>
  </>,
  <>
    <Text style={{ color: "#0000A0" }}>白虎</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>玉堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天牢</Text>{" "}
    <Text style={{ color: "#0000A0" }}>玄武</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>司命</Text>{" "}
    <Text style={{ color: "#0000A0" }}>勾陈</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>青龙</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>明堂</Text>{" "}
    <Text style={{ color: "#0000A0" }}>天刑</Text>{" "}
    <Text style={{ color: "#0000A0" }}>朱雀</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>金匮</Text>{" "}
    <Text style={{ color: "#FF8C1A" }}>天德</Text>
  </>,
];
const Gan5 = ["戊", "己", "庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁"];

const Zhi = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
];

const Zhi2 = [
  "子不问卜",
  "丑不冠带",
  "寅不祭祀",
  "卯不穿井",
  "辰不哭泣",
  "巳不远行",
  "午不苫盖",
  "未不服药",
  "申不安床",
  "酉不会客",
  "戌不吃犬",
  "亥不嫁娶",
];

const Zhi3 = [
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
];

const sfw = [
  "南",
  "东",
  "北",
  "西",
  "南",
  "东",
  "北",
  "西",
  "南",
  "东",
  "北",
  "西",
];

const AnimalIdx = [
  "鼠",
  "牛",
  "虎",
  "兔",
  "龙",
  "蛇",
  "马",
  "羊",
  "猴",
  "鸡",
  "狗",
  "猪",
];
const AnimalIdx2 = [
  "马",
  "羊",
  "猴",
  "鸡",
  "狗",
  "猪",
  "鼠",
  "牛",
  "虎",
  "兔",
  "龙",
  "蛇",
];

const sTermInfo = [
  0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072,
  240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210,
  440795, 462224, 483532, 504758,
];

const NongliData = [
  "19416",
  "19168",
  "42352",
  "21717",
  "53856",
  "55632",
  "21844",
  "22191",
  "39632",
  "21970",
  "19168",
  "42422",
  "42192",
  "53840",
  "53909",
  "46415",
  "54944",
  "44450",
  "38320",
  "18807",
  "18815",
  "42160",
  "46261",
  "27216",
  "27968",
  "43860",
  "11119",
  "38256",
  "21234",
  "18800",
  "25958",
  "54432",
  "59984",
  "27285",
  "23263",
  "11104",
  "34531",
  "37615",
  "51415",
  "51551",
  "54432",
  "55462",
  "46431",
  "22176",
  "42420",
  "9695",
  "37584",
  "53938",
  "43344",
  "46423",
  "27808",
  "46416",
  "21333",
  "19887",
  "42416",
  "17779",
  "21183",
  "43432",
  "59728",
  "27296",
  "44710",
  "43856",
  "19296",
  "43748",
  "42352",
  "21088",
  "62051",
  "55632",
  "23383",
  "22176",
  "38608",
  "19925",
  "19152",
  "42192",
  "54484",
  "53840",
  "54616",
  "46400",
  "46752",
  "38310",
  "38335",
  "18864",
  "43380",
  "42160",
  "45690",
  "27216",
  "27968",
  "44870",
  "43872",
  "38256",
  "19189",
  "18800",
  "25776",
  "29859",
  "59984",
  "27480",
  "23232",
  "43872",
  "38613",
  "37600",
  "51552",
  "55636",
  "54432",
  "55888",
  "30034",
  "22176",
  "43959",
  "9680",
  "37584",
  "51893",
  "43344",
  "46240",
  "47780",
  "44368",
  "21977",
  "19360",
  "42416",
  "20854",
  "21183",
  "43312",
  "31060",
  "27296",
  "44368",
  "23378",
  "19296",
  "42726",
  "42208",
  "53856",
  "60005",
  "54576",
  "23200",
  "30371",
  "38608",
  "19195",
  "19152",
  "42192",
  "53430",
  "53855",
  "54560",
  "56645",
  "46496",
  "22224",
  "21938",
  "18864",
  "42359",
  "42160",
  "43600",
  "45653",
  "27951",
  "44448",
  "19299",
  "37759",
  "18936",
  "18800",
  "25776",
  "26790",
  "59999",
  "27424",
  "42692",
  "43759",
  "37600",
  "53987",
  "51552",
  "54615",
  "54432",
  "55888",
  "23893",
  "22176",
  "42704",
  "21972",
  "21200",
  "43448",
  "43344",
  "46240",
  "46758",
  "44368",
  "21920",
  "43940",
  "42416",
  "21168",
  "45683",
  "26928",
  "29495",
  "27296",
  "44368",
  "19285",
  "19311",
  "42352",
  "21732",
  "53856",
  "59752",
  "54560",
  "55968",
  "27302",
  "22239",
  "19168",
  "43476",
  "42192",
  "53584",
  "62034",
  "54560",
];

const nStr1 = [
  "日",
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
  "十",
];

function padStart(num) {
  if (num > 10) return `${num}`;
  return `0${num}`;
}

export function tick() {
  const sccolor = ["red", "#00FF00"];
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let stM = tM + 1;
  const hoursMap = [
    "子",
    "丑",
    "丑",
    "寅",
    "寅",
    "卯",
    "卯",
    "辰",
    "辰",
    "巳",
    "巳",
    "午",
    "午",
    "未",
    "未",
    "申",
    "申",
    "酉",
    "酉",
    "戌",
    "戌",
    "亥",
    "亥",
    "子",
  ];

  console.log("tick");

  return {
    text: `${tY}年${stM}月${tD}日 ${padStart(hours)}:${padStart(
      minutes
    )}:${padStart(seconds)}`,
    color: sccolor[seconds % 2],
    time: hoursMap[hours],
  };
}

export function initial() {
  const SY = tY - 1900;
  const SM = tM;
  const result = drawCld(tY, tM);

  return { SY, SM, result };
}

function solarDays(y, m) {
  if (m == 1) return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0 ? 29 : 28;
  else return solarMonth[m];
}

function cyclical(num) {
  return Gan[num % 10] + Zhi[num % 12];
}

function sTerm(y, n) {
  var offDate = new Date(
    31556925974.7 * (y - 1900) +
      sTermInfo[n] * 60000 +
      Date.UTC(1900, 0, 6, 2, 5)
  );
  return offDate.getUTCDate();
}

function leapMonth(y) {
  var lm = parseInt(NongliData[y - 1900]) & 0xf;
  return lm == 0xf ? 0 : lm;
}

function leapDays(y) {
  if (leapMonth(y))
    return (parseInt(NongliData[y - 1899]) & 0xf) == 0xf ? 30 : 29;
  else return 0;
}

function lYearDays(y) {
  let i,
    sum = 348;
  for (i = 0x8000; i > 0x8; i >>= 1)
    sum += parseInt(NongliData[y - 1900]) & i ? 1 : 0;
  return sum + leapDays(y);
}

function monthDays(y, m) {
  return parseInt(NongliData[y - 1900]) & (0x10000 >> m) ? 30 : 29;
}

function Lunar(objDate) {
  let i: number,
    leap = 0,
    temp = 0;
  let offset =
    (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) -
      Date.UTC(1900, 0, 31)) /
    86400000;
  for (i = 1900; i < 2100 && offset > 0; i++) {
    temp = lYearDays(i);
    offset -= temp;
  }
  if (offset < 0) {
    offset += temp;
    i--;
  }
  this.year = i;
  leap = leapMonth(i);
  this.isLeap = false;
  for (i = 1; i < 13 && offset > 0; i++) {
    if (leap > 0 && i == leap + 1 && this.isLeap == false) {
      --i;
      this.isLeap = true;
      temp = leapDays(this.year);
    } else {
      temp = monthDays(this.year, i);
    }
    if (this.isLeap == true && i == leap + 1) this.isLeap = false;
    offset -= temp;
  }
  if (offset == 0 && leap > 0 && i == leap + 1)
    if (this.isLeap) {
      this.isLeap = false;
    } else {
      this.isLeap = true;
      --i;
    }
  if (offset < 0) {
    offset += temp;
    --i;
  }
  this.month = i;
  this.day = offset + 1;
}

function calElement(
  sYear,
  sMonth,
  sDay,
  week,
  lYear,
  lMonth,
  lDay,
  isLeap,
  cYear,
  cMonth,
  cDay
) {
  this.isToday = false;

  this.sYear = sYear;
  this.sMonth = sMonth;
  this.sDay = sDay;
  this.week = week;

  this.lYear = lYear;
  this.lMonth = lMonth;
  this.lDay = lDay;
  this.isLeap = isLeap;

  this.cYear = cYear;
  this.cMonth = cMonth;
  this.cDay = cDay;

  this.color = "";
  this.solarTerms = "";
  this.solarFestival = "";
  this.lunarFestival = "";
}

function cyclical3(num) {
  return (
    <Text style={{ color: "#804000" }}>
      彭祖百忌：{`[${Gan2[num % 10]} ${Zhi2[num % 12]}]`}
    </Text>
  );
}

function cyclical4(num) {
  return Gan3[num % 10];
}

function cyclical5(num) {
  return Gan4[num % 12];
}

function jzny(d) {
  let ny;
  if (d == "00" || d == "11") ny = "海中金";
  if (d == "22" || d == "33") ny = "炉中火";
  if (d == "44" || d == "55") ny = "大林木";
  if (d == "66" || d == "77") ny = "路旁土";
  if (d == "88" || d == "99") ny = "剑锋金";
  if (d == "010" || d == "111") ny = "山头火";
  if (d == "20" || d == "31") ny = "洞下水";
  if (d == "42" || d == "53") ny = "城墙土";
  if (d == "64" || d == "75") ny = "白腊金";
  if (d == "86" || d == "97") ny = "杨柳木";
  if (d == "08" || d == "19") ny = "泉中水";
  if (d == "210" || d == "311") ny = "屋上土";
  if (d == "40" || d == "51") ny = "霹雷火";
  if (d == "62" || d == "73") ny = "松柏木";
  if (d == "84" || d == "95") ny = "常流水";
  if (d == "06" || d == "17") ny = "沙中金";
  if (d == "28" || d == "39") ny = "山下火";
  if (d == "410" || d == "511") ny = "平地木";
  if (d == "60" || d == "71") ny = "壁上土";
  if (d == "82" || d == "93") ny = "金箔金";
  if (d == "04" || d == "15") ny = "佛灯火";
  if (d == "26" || d == "37") ny = "天河水";
  if (d == "48" || d == "59") ny = "大驿土";
  if (d == "610" || d == "711") ny = "钗钏金";
  if (d == "80" || d == "91") ny = "桑柘木";
  if (d == "02" || d == "13") ny = "大溪水";
  if (d == "24" || d == "35") ny = "沙中土";
  if (d == "46" || d == "57") ny = "天上火";
  if (d == "68" || d == "79") ny = "石榴木";
  if (d == "810" || d == "911") ny = "大海水";
  return ny;
}

function jznyy(d) {
  let nyy;
  if (d == "00" || d == "11") nyy = "金";
  if (d == "22" || d == "33") nyy = "火";
  if (d == "44" || d == "55") nyy = "木";
  if (d == "66" || d == "77") nyy = "土";
  if (d == "88" || d == "99") nyy = "金";
  if (d == "010" || d == "111") nyy = "火";
  if (d == "20" || d == "31") nyy = "水";
  if (d == "42" || d == "53") nyy = "土";
  if (d == "64" || d == "75") nyy = "金";
  if (d == "86" || d == "97") nyy = "木";
  if (d == "08" || d == "19") nyy = "水";
  if (d == "210" || d == "311") nyy = "土";
  if (d == "40" || d == "51") nyy = "火";
  if (d == "62" || d == "73") nyy = "木";
  if (d == "84" || d == "95") nyy = "水";
  if (d == "06" || d == "17") nyy = "金";
  if (d == "28" || d == "39") nyy = "火";
  if (d == "410" || d == "511") nyy = "木";
  if (d == "60" || d == "71") nyy = "土";
  if (d == "82" || d == "93") nyy = "金";
  if (d == "04" || d == "15") nyy = "火";
  if (d == "26" || d == "37") nyy = "水";
  if (d == "48" || d == "59") nyy = "土";
  if (d == "610" || d == "711") nyy = "金";
  if (d == "80" || d == "91") nyy = "木";
  if (d == "02" || d == "13") nyy = "水";
  if (d == "24" || d == "35") nyy = "土";
  if (d == "46" || d == "57") nyy = "火";
  if (d == "68" || d == "79") nyy = "木";
  if (d == "810" || d == "911") nyy = "水";
  return nyy;
}

function CalConv(d, dd) {
  return `岁煞${sfw[dd]} ${AnimalIdx[dd]}日冲(${Gan5[d]}${Zhi3[dd]})${AnimalIdx2[dd]}`;
}

function CalConv2(yy, mm, dd, y, d, m, dt, nm, nd) {
  var dy = d + "" + dd;
  if (
    (yy == 0 && dd == 6) ||
    (yy == 6 && dd == 0) ||
    (yy == 1 && dd == 7) ||
    (yy == 7 && dd == 1) ||
    (yy == 2 && dd == 8) ||
    (yy == 8 && dd == 2) ||
    (yy == 3 && dd == 9) ||
    (yy == 9 && dd == 3) ||
    (yy == 4 && dd == 10) ||
    (yy == 10 && dd == 4) ||
    (yy == 5 && dd == 11) ||
    (yy == 11 && dd == 5)
  ) {
    return (
      <Text style={{ color: "#0000A0", textAlign: "center" }}>
        日值岁破 大事不宜
      </Text>
    );
  } else if (
    (mm == 0 && dd == 6) ||
    (mm == 6 && dd == 0) ||
    (mm == 1 && dd == 7) ||
    (mm == 7 && dd == 1) ||
    (mm == 2 && dd == 8) ||
    (mm == 8 && dd == 2) ||
    (mm == 3 && dd == 9) ||
    (mm == 9 && dd == 3) ||
    (mm == 4 && dd == 10) ||
    (mm == 10 && dd == 4) ||
    (mm == 5 && dd == 11) ||
    (mm == 11 && dd == 5)
  ) {
    return (
      <Text style={{ color: "#0000A0", textAlign: "center" }}>
        日值月破 大事不宜
      </Text>
    );
  } else if (
    (y == 0 && dy == "911") ||
    (y == 1 && dy == "55") ||
    (y == 2 && dy == "111") ||
    (y == 3 && dy == "75") ||
    (y == 4 && dy == "311") ||
    (y == 5 && dy == "95") ||
    (y == 6 && dy == "511") ||
    (y == 7 && dy == "15") ||
    (y == 8 && dy == "711") ||
    (y == 9 && dy == "35")
  ) {
    return (
      <Text style={{ color: "#0000A0", textAlign: "center" }}>
        日值上朔 大事不宜
      </Text>
    );
  } else if (
    (m == 1 && dt == 13) ||
    (m == 2 && dt == 11) ||
    (m == 3 && dt == 9) ||
    (m == 4 && dt == 7) ||
    (m == 5 && dt == 5) ||
    (m == 6 && dt == 3) ||
    (m == 7 && dt == 1) ||
    (m == 7 && dt == 29) ||
    (m == 8 && dt == 27) ||
    (m == 9 && dt == 25) ||
    (m == 10 && dt == 23) ||
    (m == 11 && dt == 21) ||
    (m == 12 && dt == 19)
  ) {
    return (
      <Text style={{ color: "#0000A0", textAlign: "center" }}>
        日值杨公十三忌 大事不宜
      </Text>
    );
  } else {
    return 0;
  }
}
function cyclical6(num, num2) {
  if (num == 0) return jcName0[num2];
  if (num == 1) return jcName1[num2];
  if (num == 2) return jcName2[num2];
  if (num == 3) return jcName3[num2];
  if (num == 4) return jcName4[num2];
  if (num == 5) return jcName5[num2];
  if (num == 6) return jcName6[num2];
  if (num == 7) return jcName7[num2];
  if (num == 8) return jcName8[num2];
  if (num == 9) return jcName9[num2];
  if (num == 10) return jcName10[num2];
  if (num == 11) return jcName11[num2];
}

function cyclical7(num, num2) {
  if (num == 2) return zrxName1[num2];
  if (num == 3) return zrxName2[num2];
  if (num == 4) return zrxName3[num2];
  if (num == 5) return zrxName4[num2];
  if (num == 6) return zrxName5[num2];
  if (num == 7) return zrxName6[num2];
  if (num == 8) return zrxName7[num2];
  if (num == 9) return zrxName8[num2];
  if (num == 10) return zrxName9[num2];
  if (num == 11) return zrxName10[num2];
  if (num == 0) return zrxName11[num2];
  if (num == 1) return zrxName12[num2];
}

function easter(y) {
  var term2 = sTerm(y, 5);
  var dayTerm2 = new Date(Date.UTC(y, 2, term2, 0, 0, 0, 0));
  var lDayTerm2 = new Lunar(dayTerm2);

  if (lDayTerm2.day < 15) var lMlen = 15 - lDayTerm2.day;
  else
    var lMlen =
      (lDayTerm2.isLeap ? leapDays(y) : monthDays(y, lDayTerm2.month)) -
      lDayTerm2.day +
      15;
  var l15 = new Date(dayTerm2.getTime() + 86400000 * lMlen);
  var dayEaster = new Date(l15.getTime() + 86400000 * (7 - l15.getUTCDay()));
  this.m = dayEaster.getUTCMonth();
  this.d = dayEaster.getUTCDate();
}

function calendar(y, m) {
  let sDObj,
    lDObj,
    lY,
    lM,
    lD = 1,
    lL,
    lX = 0,
    tmp1,
    tmp2,
    lM2,
    lY2,
    lD2,
    tmp3,
    dayglus,
    bsg,
    xs,
    xs1,
    fs,
    fs1,
    cs,
    cs1,
    cY,
    cM,
    cD;
  let lDPOS = new Array(3);
  let n = 0;
  let firstLM = 0;

  sDObj = new Date(y, m, 1, 0, 0, 0, 0);
  this.length = solarDays(y, m);
  this.firstWeek = sDObj.getDay();
  if (m < 2) {
    cY = cyclical(y - 1900 + 36 - 1);
    lY2 = y - 1900 + 36 - 1;
  } else {
    cY = cyclical(y - 1900 + 36);
    lY2 = y - 1900 + 36;
  }
  var term2 = sTerm(y, 2);
  var firstNode = sTerm(y, m * 2);
  cM = cyclical((y - 1900) * 12 + m + 12);
  lM2 = (y - 1900) * 12 + m + 12;
  var dayCyclical = Date.UTC(y, m, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;

  for (var i = 0; i < this.length; i++) {
    if (lD > lX) {
      sDObj = new Date(y, m, i + 1);
      lDObj = new Lunar(sDObj);
      lY = lDObj.year;
      lM = lDObj.month;
      lD = lDObj.day;
      lL = lDObj.isLeap;
      lX = lL ? leapDays(lY) : monthDays(lY, lM);
      if (n == 0) firstLM = lM;
      lDPOS[n++] = i - lD + 1;
    }
    if (m == 1 && i + 1 == term2) {
      cY = cyclical(y - 1900 + 36);
      lY2 = y - 1900 + 36;
    }
    if (i + 1 == firstNode) {
      cM = cyclical((y - 1900) * 12 + m + 13);
      lM2 = (y - 1900) * 12 + m + 13;
    }
    cD = cyclical(dayCyclical + i);
    lD2 = dayCyclical + i;
    this[i] = new calElement(
      y,
      m + 1,
      i + 1,
      nStr1[(i + this.firstWeek) % 7],
      lY,
      lM,
      lD++,
      lL,
      cY,
      cM,
      cD
    );
    bsg = lD2 % 12;
    cs1 = i + 1;
    if (m == 0) {
      if (cs1 < sTerm(y, m * 2) - 1) {
        xs1 = "水泉动";
      } else if (cs1 >= sTerm(y, m * 2) - 1 && cs1 <= sTerm(y, m * 2) + 3) {
        xs1 = "雁北乡";
      } else if (cs1 > sTerm(y, m * 2) + 3 && cs1 <= sTerm(y, m * 2) + 8) {
        xs1 = "鹊始巢";
      } else if (cs1 > sTerm(y, m * 2) + 8 && cs1 < sTerm(y, m * 2 + 1) - 1) {
        xs1 = "鳺始鴝";
      } else if (
        cs1 >= sTerm(y, m * 2 + 1) - 1 &&
        cs1 <= sTerm(y, m * 2 + 1) + 3
      ) {
        xs1 = "鸡始乳";
      } else if (
        cs1 > sTerm(y, m * 2 + 1) + 3 &&
        cs1 <= sTerm(y, m * 2 + 1) + 8
      ) {
        xs1 = "征鸟厉疾";
      } else if (cs1 > sTerm(y, m * 2 + 1) + 8) {
        xs1 = "水泽腹坚";
      }
    }
    if (m == 1) {
      if (cs1 < sTerm(y, m * 2) - 1) {
        xs1 = "水泽腹坚";
      } else if (cs1 >= sTerm(y, m * 2) - 1 && cs1 <= sTerm(y, m * 2) + 3) {
        xs1 = "东风解冻";
      } else if (cs1 > sTerm(y, m * 2) + 3 && cs1 <= sTerm(y, m * 2) + 8) {
        xs1 = "蛰虫始振";
      } else if (cs1 > sTerm(y, m * 2) + 8 && cs1 < sTerm(y, m * 2 + 1) - 1) {
        xs1 = "鱼上冰";
      } else if (
        cs1 >= sTerm(y, m * 2 + 1) - 1 &&
        cs1 <= sTerm(y, m * 2 + 1) + 3
      ) {
        xs1 = "獭祭鱼";
      } else if (
        cs1 > sTerm(y, m * 2 + 1) + 3 &&
        cs1 <= sTerm(y, m * 2 + 1) + 8
      ) {
        xs1 = "候雁北";
      } else if (cs1 > sTerm(y, m * 2 + 1) + 8) {
        xs1 = "草木萌动";
      }
    }
    if (m == 2) {
      if (cs1 < sTerm(y, m * 2) - 1) {
        xs1 = "草木萌动";
      } else if (cs1 >= sTerm(y, m * 2) - 1 && cs1 <= sTerm(y, m * 2) + 3) {
        xs1 = "桃始华";
      } else if (cs1 > sTerm(y, m * 2) + 3 && cs1 <= sTerm(y, m * 2) + 8) {
        xs1 = "仓庚鸣";
      } else if (cs1 > sTerm(y, m * 2) + 8 && cs1 < sTerm(y, m * 2 + 1) - 1) {
        xs1 = "鹰化为鸠";
      } else if (
        cs1 >= sTerm(y, m * 2 + 1) - 1 &&
        cs1 <= sTerm(y, m * 2 + 1) + 3
      ) {
        xs1 = "玄鸟至";
      } else if (
        cs1 > sTerm(y, m * 2 + 1) + 3 &&
        cs1 <= sTerm(y, m * 2 + 1) + 8
      ) {
        xs1 = "雷乃发声";
      } else if (cs1 > sTerm(y, m * 2 + 1) + 8) {
        xs1 = "始电";
      }
    }
    if (m == 3) {
      if (cs1 < sTerm(y, m * 2) - 1) {
        xs1 = "始电";
      } else if (cs1 >= sTerm(y, m * 2) - 1 && cs1 <= sTerm(y, m * 2) + 3) {
        xs1 = "桐始华";
      } else if (cs1 > sTerm(y, m * 2) + 3 && cs1 <= sTerm(y, m * 2) + 8) {
        xs1 = "田鼠化为鴽";
      } else if (cs1 > sTerm(y, m * 2) + 8 && cs1 < sTerm(y, m * 2 + 1) - 1) {
        xs1 = "虹始见";
      } else if (
        cs1 >= sTerm(y, m * 2 + 1) - 1 &&
        cs1 <= sTerm(y, m * 2 + 1) + 3
      ) {
        xs1 = "萍始生";
      } else if (
        cs1 > sTerm(y, m * 2 + 1) + 3 &&
        cs1 <= sTerm(y, m * 2 + 1) + 8
      ) {
        xs1 = "鸣鸠拂其羽";
      } else if (cs1 > sTerm(y, m * 2 + 1) + 8) {
        xs1 = "戴胜降于桑";
      }
    }
    if (m == 4) {
      if (cs1 < sTerm(y, m * 2) - 1) {
        xs1 = "戴胜降于桑";
      } else if (cs1 >= sTerm(y, m * 2) - 1 && cs1 <= sTerm(y, m * 2) + 3) {
        xs1 = "蝼蝈鸣";
      } else if (cs1 > sTerm(y, m * 2) + 3 && cs1 <= sTerm(y, m * 2) + 8) {
        xs1 = "蚯蚓出";
      } else if (cs1 > sTerm(y, m * 2) + 8 && cs1 < sTerm(y, m * 2 + 1) - 1) {
        xs1 = "王瓜生";
      } else if (
        cs1 >= sTerm(y, m * 2 + 1) - 1 &&
        cs1 <= sTerm(y, m * 2 + 1) + 3
      ) {
        xs1 = "苦菜秀";
      } else if (
        cs1 > sTerm(y, m * 2 + 1) + 3 &&
        cs1 <= sTerm(y, m * 2 + 1) + 8
      ) {
        xs1 = "靡草死";
      } else if (cs1 > sTerm(y, m * 2 + 1) + 8) {
        xs1 = "麦秋至";
      }
    }
    if (m == 5) {
      if (cs1 < sTerm(y, m * 2) - 1) {
        xs1 = "麦秋至";
      } else if (cs1 >= sTerm(y, m * 2) - 1 && cs1 <= sTerm(y, m * 2) + 3) {
        xs1 = "螳螂生";
      } else if (cs1 > sTerm(y, m * 2) + 3 && cs1 <= sTerm(y, m * 2) + 8) {
        xs1 = "鵙始鸣";
      } else if (cs1 > sTerm(y, m * 2) + 8 && cs1 < sTerm(y, m * 2 + 1) - 1) {
        xs1 = "反舌无声";
      } else if (
        cs1 >= sTerm(y, m * 2 + 1) - 1 &&
        cs1 <= sTerm(y, m * 2 + 1) + 3
      ) {
        xs1 = "鹿角解";
      } else if (
        cs1 > sTerm(y, m * 2 + 1) + 3 &&
        cs1 <= sTerm(y, m * 2 + 1) + 8
      ) {
        xs1 = "蜩始鸣";
      } else if (cs1 > sTerm(y, m * 2 + 1) + 8) {
        xs1 = "半夏生";
      }
    }
    if (m == 6) {
      if (cs1 < sTerm(y, m * 2) - 1) {
        xs1 = "半夏生";
      } else if (cs1 >= sTerm(y, m * 2) - 1 && cs1 <= sTerm(y, m * 2) + 3) {
        xs1 = "温风至";
      } else if (cs1 > sTerm(y, m * 2) + 3 && cs1 <= sTerm(y, m * 2) + 8) {
        xs1 = "蟀蟋居壁";
      } else if (cs1 > sTerm(y, m * 2) + 8 && cs1 < sTerm(y, m * 2 + 1) - 1) {
        xs1 = "鹰如鸷";
      } else if (
        cs1 >= sTerm(y, m * 2 + 1) - 1 &&
        cs1 <= sTerm(y, m * 2 + 1) + 3
      ) {
        xs1 = "腐草为萤";
      } else if (
        cs1 > sTerm(y, m * 2 + 1) + 3 &&
        cs1 <= sTerm(y, m * 2 + 1) + 8
      ) {
        xs1 = "土润溽暑";
      } else if (cs1 > sTerm(y, m * 2 + 1) + 8) {
        xs1 = "大雨时行";
      }
    }
    if (m == 7) {
      if (cs1 < sTerm(y, m * 2) - 1) {
        xs1 = "大雨时行";
      } else if (cs1 >= sTerm(y, m * 2) - 1 && cs1 <= sTerm(y, m * 2) + 3) {
        xs1 = "凉风至";
      } else if (cs1 > sTerm(y, m * 2) + 3 && cs1 <= sTerm(y, m * 2) + 8) {
        xs1 = "白露降";
      } else if (cs1 > sTerm(y, m * 2) + 8 && cs1 < sTerm(y, m * 2 + 1) - 1) {
        xs1 = "寒蝉鸣";
      } else if (
        cs1 >= sTerm(y, m * 2 + 1) - 1 &&
        cs1 <= sTerm(y, m * 2 + 1) + 3
      ) {
        xs1 = "鹰乃祭鸟";
      } else if (
        cs1 > sTerm(y, m * 2 + 1) + 3 &&
        cs1 <= sTerm(y, m * 2 + 1) + 8
      ) {
        xs1 = "天地始肃";
      } else if (cs1 > sTerm(y, m * 2 + 1) + 8) {
        xs1 = "禾乃登";
      }
    }
    if (m == 8) {
      if (cs1 < sTerm(y, m * 2) - 1) {
        xs1 = "禾乃登";
      } else if (cs1 >= sTerm(y, m * 2) - 1 && cs1 <= sTerm(y, m * 2) + 3) {
        xs1 = "鸿雁来";
      } else if (cs1 > sTerm(y, m * 2) + 3 && cs1 <= sTerm(y, m * 2) + 8) {
        xs1 = "玄鸟归";
      } else if (cs1 > sTerm(y, m * 2) + 8 && cs1 < sTerm(y, m * 2 + 1) - 1) {
        xs1 = "群鸟养羞";
      } else if (
        cs1 >= sTerm(y, m * 2 + 1) - 1 &&
        cs1 <= sTerm(y, m * 2 + 1) + 3
      ) {
        xs1 = "雷乃收声";
      } else if (
        cs1 > sTerm(y, m * 2 + 1) + 3 &&
        cs1 <= sTerm(y, m * 2 + 1) + 8
      ) {
        xs1 = "蛰虫坯户";
      } else if (cs1 > sTerm(y, m * 2 + 1) + 8) {
        xs1 = "水始涸";
      }
    }
    if (m == 9) {
      if (cs1 < sTerm(y, m * 2) - 1) {
        xs1 = "水始涸";
      } else if (cs1 >= sTerm(y, m * 2) - 1 && cs1 <= sTerm(y, m * 2) + 3) {
        xs1 = "鸿雁来宾";
      } else if (cs1 > sTerm(y, m * 2) + 3 && cs1 <= sTerm(y, m * 2) + 8) {
        xs1 = "雀入大水为蛤";
      } else if (cs1 > sTerm(y, m * 2) + 8 && cs1 < sTerm(y, m * 2 + 1) - 1) {
        xs1 = "菊有黄花";
      } else if (
        cs1 >= sTerm(y, m * 2 + 1) - 1 &&
        cs1 <= sTerm(y, m * 2 + 1) + 3
      ) {
        xs1 = "豺乃祭兽";
      } else if (
        cs1 > sTerm(y, m * 2 + 1) + 3 &&
        cs1 <= sTerm(y, m * 2 + 1) + 8
      ) {
        xs1 = "草木黄落";
      } else if (cs1 > sTerm(y, m * 2 + 1) + 8) {
        xs1 = "蛰虫咸俯";
      }
    }
    if (m == 10) {
      if (cs1 < sTerm(y, m * 2) - 1) {
        xs1 = "蛰虫咸俯";
      } else if (cs1 >= sTerm(y, m * 2) - 1 && cs1 <= sTerm(y, m * 2) + 3) {
        xs1 = "水始冰";
      } else if (cs1 > sTerm(y, m * 2) + 3 && cs1 <= sTerm(y, m * 2) + 8) {
        xs1 = "地始冻";
      } else if (cs1 > sTerm(y, m * 2) + 8 && cs1 < sTerm(y, m * 2 + 1) - 1) {
        xs1 = "雉入大水为蜃";
      } else if (
        cs1 >= sTerm(y, m * 2 + 1) - 1 &&
        cs1 <= sTerm(y, m * 2 + 1) + 3
      ) {
        xs1 = "虹藏不见";
      } else if (
        cs1 > sTerm(y, m * 2 + 1) + 3 &&
        cs1 <= sTerm(y, m * 2 + 1) + 8
      ) {
        xs1 = "天气腾地气降";
      } else if (cs1 > sTerm(y, m * 2 + 1) + 8) {
        xs1 = "闭塞成冬";
      }
    }
    if (m == 11) {
      if (cs1 < sTerm(y, m * 2) - 1) {
        xs1 = "闭塞成冬";
      } else if (cs1 >= sTerm(y, m * 2) - 1 && cs1 <= sTerm(y, m * 2) + 3) {
        xs1 = "鹖鴠不鸣";
      } else if (cs1 > sTerm(y, m * 2) + 3 && cs1 <= sTerm(y, m * 2) + 8) {
        xs1 = "虎始交";
      } else if (cs1 > sTerm(y, m * 2) + 8 && cs1 < sTerm(y, m * 2 + 1) - 1) {
        xs1 = "荔挺出";
      } else if (
        cs1 >= sTerm(y, m * 2 + 1) - 1 &&
        cs1 <= sTerm(y, m * 2 + 1) + 3
      ) {
        xs1 = "蚯蚓结";
      } else if (
        cs1 > sTerm(y, m * 2 + 1) + 3 &&
        cs1 <= sTerm(y, m * 2 + 1) + 8
      ) {
        xs1 = "麋鹿解";
      } else if (cs1 > sTerm(y, m * 2 + 1) + 8) {
        xs1 = "水泉动";
      }
    }
    if (bsg == 0) {
      dayglus = Gan[9] + "命进禄 ";
    } else if (bsg == 2) {
      dayglus = Gan[0] + "命进禄 ";
    } else if (bsg == 3) {
      dayglus = Gan[1] + "命进禄 ";
    } else if (bsg == 5) {
      dayglus = Gan[2] + "," + Gan[4] + "命进禄 ";
    } else if (bsg == 6) {
      dayglus = Gan[3] + "," + Gan[5] + "命进禄 ";
    } else if (bsg == 8) {
      dayglus = Gan[6] + "命进禄 ";
    } else if (bsg == 9) {
      dayglus = Gan[7] + "命进禄 ";
    } else if (bsg == 11) {
      dayglus = Gan[8] + "命进禄 ";
    } else {
      dayglus = "";
    }
    if (lD2 % 10 == 0 || lD2 % 10 == 5) {
      xs = "东北";
    } else if (lD2 % 10 == 1 || lD2 % 10 == 6) {
      xs = "西北";
    } else if (lD2 % 10 == 2 || lD2 % 10 == 7) {
      xs = "西南";
    } else if (lD2 % 10 == 3 || lD2 % 10 == 8) {
      xs = "正南";
    } else if (lD2 % 10 == 4 || lD2 % 10 == 9) {
      xs = "东南";
    }
    if (lD2 % 10 == 0 || lD2 % 10 == 1) {
      fs = "东南";
    } else if (lD2 % 10 == 2 || lD2 % 10 == 3) {
      fs = "正东";
    } else if (lD2 % 10 == 4) {
      fs = "正北";
    } else if (lD2 % 10 == 5) {
      fs = "正南";
    } else if (lD2 % 10 == 6 || lD2 % 10 == 7) {
      fs = "西南";
    } else if (lD2 % 10 == 8) {
      fs = "西北";
    } else if (lD2 % 10 == 9) {
      fs = "正西";
    }
    if (lD2 % 10 == 0 || lD2 % 10 == 1) {
      cs = "东北";
    } else if (lD2 % 10 == 2 || lD2 % 10 == 3) {
      cs = "西南";
    } else if (lD2 % 10 == 4 || lD2 % 10 == 5) {
      cs = "正北";
    } else if (lD2 % 10 == 6 || lD2 % 10 == 7) {
      cs = "正东";
    } else if (lD2 % 10 == 8 || lD2 % 10 == 9) {
      cs = "正南";
    }
    this[i].pgday = cyclical3(lD2);
    this[i].dGz = "时辰：" + cyclical4(lD2);
    this[i].sgz = (
      <>
        <Text style={{ color: "#FF8C1A" }}>吉</Text>
        <Text style={{ color: "#0000A0" }}>凶</Text>：`${cyclical5(lD2)}`
      </>
    );
    this[i].sgz2 = jzny(`${lD2 % 10}${lD2 % 12}`);
    this[i].sgz4 = CalConv(lD2 % 10, lD2 % 12);
    this[i].sgz5 = CalConv2(
      lY2 % 12,
      lM2 % 12,
      lD2 % 12,
      lY2 % 10,
      lD2 % 10,
      lM,
      lD - 1,
      m + 1,
      cs1
    );
    this[i].sgz6 = cyclical7(lM2 % 12, lD2 % 12);
    this[i].sgz7 = jznyy(`${lD2 % 10}${lD2 % 12}`);

    this[i].sgz8 = jznyy(`${lD2 % 10}${lD2 % 12}`);
    this[i].sgz9 = jznyy(`${lD2 % 10}${lD2 % 12}`);
    this[i].sgz3 = cyclical6(lM2 % 12, lD2 % 12);
    this[i].dayglu = (
      <Text>
        ◇是日命禄：
        <Text style={{ color: "red" }}>
          `${dayglk[lD2 % 10]}命互禄 ${dayglus}`
        </Text>
      </Text>
    );
    this[i].ssfw = (
      <Text>
        ◇喜神：<Text style={{ color: "red" }}>`${xs}`</Text>
        ◇福神：<Text style={{ color: "red" }}>`${fs}`</Text>
        ◇财神：<Text style={{ color: "red" }}>`${cs}`</Text>
      </Text>
    );
    this[i].fs1 = "本日物候：" + xs1;
    if ((i + this.firstWeek) % 7 == 0) this[i].color = "red";
    if ((i + this.firstWeek) % 14 == 13) this[i].color = "red";
    this[i].sgzzm2 =
      "◆" +
      sTerm(y, m * 2) +
      "日" +
      solarTerm[m * 2] +
      "  " +
      "◆" +
      sTerm(y, m * 2 + 1) +
      "日" +
      solarTerm[m * 2 + 1];
  }
  if (y == tY && m == tM) this[tD - 1].solarTerms += "今天";

  tmp1 = sTerm(y, m * 2) - 1;
  tmp2 = sTerm(y, m * 2 + 1) - 1;
  console.log("==solarTerm==", solarTerm);

  this[tmp1].solarTerms = solarTerm[m * 2];
  this[tmp2].solarTerms = solarTerm[m * 2 + 1];

  if (m == 3) this[tmp1].color = "#CC4AF7";

  console.log("sFtv", sFtv);

  for (let sFtvi in sFtv)
    if (sFtv[sFtvi].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
      if (Number(RegExp.$1) == m + 1) {
        this[Number(RegExp.$2) - 1].solarFestival += RegExp.$4 + " ";
        if (RegExp.$3 == "*") this[Number(RegExp.$2) - 1].color = "#BC02D7";
      }

  console.log("wFtv", wFtv);
  for (let wFtvi in wFtv)
    if (wFtv[wFtvi].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
      if (Number(RegExp.$1) == m + 1) {
        tmp1 = Number(RegExp.$2);
        tmp2 = Number(RegExp.$3);
        if (tmp1 < 5)
          this[
            (this.firstWeek > tmp2 ? 7 : 0) +
              7 * (tmp1 - 1) +
              tmp2 -
              this.firstWeek
          ].solarFestival += RegExp.$5 + " ";
        else {
          tmp1 -= 5;
          tmp3 = (this.firstWeek + this.length - 1) % 7;
          this[
            this.length - tmp3 - 7 * tmp1 + tmp2 - (tmp2 > tmp3 ? 7 : 0) - 1
          ].solarFestival += RegExp.$5 + " ";
        }
      }

  console.log("lFtv", lFtv);

  for (let lFtvi in lFtv)
    if (lFtv[lFtvi].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
      tmp1 = Number(RegExp.$1) - firstLM;
      if (tmp1 == -11) tmp1 = 1;
      if (tmp1 >= 0 && tmp1 < n) {
        tmp2 = lDPOS[tmp1] + Number(RegExp.$2) - 1;
        if (tmp2 >= 0 && tmp2 < this.length) {
          this[tmp2].lunarFestival += RegExp.$4 + " ";
          if (RegExp.$3 == "*") this[tmp2].color = "#FF00FF";
        }
      }
    }
  if (m == 2 || m == 3) {
    var estDay = new easter(y);
    if (m == estDay.m)
      this[estDay.d - 1].solarFestival =
        this[estDay.d - 1].solarFestival + "复活节";
  }
  if ((this.firstWeek + 12) % 7 == 5) this[12].solarFestival += "黑色星期五";
  if (y == tY && m == tM) this[tD - 1].isToday = true;
}

const NKyuusei: any[] = [];
const KyuuseiJD = [];
const KyuuseiJDF = [];
const tqyb = [];

function GetTenton(JD) {
  var KJD, KJDF;
  var n, ne;
  ne = KyuuseiJD.length;
  JD = Math.floor(JD);
  if (JD < KyuuseiJD[0]) return -1;
  if (JD >= KyuuseiJD[ne - 1]) return -1;

  for (n = 1; n < ne; n++) {
    if (JD < KyuuseiJD[n]) break;
  }
  KJD = KyuuseiJD[n - 1];
  KJDF = KyuuseiJDF[n - 1];
  ne = KyuuseiJD[n];
  do {
    NKyuusei[0] = KJD;
    KJD += 180;
    if (KJD + 61 > ne) {
      KJD = ne;
    }
    if (JD >= KJD) {
      KJDF = KJDF < 0 ? 1 : -9;
    }
  } while (JD >= KJD);
  NKyuusei[1] = KJD - NKyuusei[0];
  NKyuusei[2] = KJDF;
  return NKyuusei[0];
}

function Jd2Kyuusei(JD) {
  var flag, base;
  JD = Math.floor(JD);
  if (JD < NKyuusei[0] || JD >= NKyuusei[0] + NKyuusei[1]) {
    if (GetTenton(JD) < 0) return -1;
  }

  if (NKyuusei[2] < 0) {
    flag = -1;
  } else {
    flag = 1;
  }
  base = flag * NKyuusei[2] - 1 + 270;
  base += (JD - NKyuusei[0]) * flag;
  return base % 9;
}

function Jd2KyuuseiNameL2(JD) {
  var ans;
  ans = Jd2Kyuusei(JD);
  if (ans >= 0) {
    return KyuuseiName3[ans];
  }
  return "";
}

function GetSukuD(dd) {
  var s;
  s = (dd + SukuDofs) % 28;
  return Sukuyou[s];
}

function GetSuku2D(dd) {
  var s;
  s = (dd + SukuDofs) % 28;
  return Sukuyou2[s];
}

function GetSuku3D(dd) {
  var s;
  s = (dd + SukuDofs) % 28;
  return Sukuyou3[s];
}

function GetSuku4D(dd) {
  var s;
  s = (dd + SukuDofs) % 28;
  return Sukuyou4[s];
}

// function showtip2(current, e, text, tips, xing) {
//   var jie1, jie2, jie4, bt, tip2;
//   if (tips > 2) {
//     jie1 = "<br>" + Jd2KyuuseiNameL2(tips);
//     jie2 = "<br>" + GetSuku3D(tips * 1);
//     bt = "#FDF5C4";
//     text = "<center><b>是日星宿宜忌</b></center><br>" + text;
//     xing = "<br><br>" + xing;
//   } else {
//     bt = "#EBEBEB";
//     jie1 = "";
//     if (tips == 1) {
//       jie2 = "<br>" + xing;
//     } else if (tips == -1) {
//       jie2 = "<br>" + xing;
//     } else if (tips == 0) {
//       jie2 = "<br>" + month2[xing];
//     } else if (tips == 2) {
//       jie4 = tqyb[xing];

//         text =
//           '<table align=center style="font-size: 9pt;"><tr><td align=right><br><b><font color=#FF8000>' +
//           tD1 +
//           "/" +
//           ybm1 +
//           "<br>" +
//           tD2 +
//           "/" +
//           ybm2 +
//           "<br>" +
//           tD3 +
//           "/" +
//           ybm3 +
//           "</td><td>" +
//           jie4 +
//           "</td></tr></table>";
//       jie2 = "";
//     }
//     xing = "";
//   }
//   jie2 = jie2.replace(/\n/g, "<br>");
//   if (tips != 2) {
//     tip2 =
//       text  +
//       jie1 +
//       xing +
//       jie2
//   }
//   if (tips == 2) {
//     tip2 = text;
//   }

//   return {jie1, jie2, jie4, bt, tip2, text}
// }

const Animals = [
  {
    name: "鼠",
    text: "[肖鼠]个性：富幽默感及敏锐的观察力，行事积极，对工作或异性设想周到且细腻，其创见常令人激赏，具敏锐的观察力。",
    tips: "特征：年幼时,劳碌奔波中越能发挥其灵敏的智能与耐性;在宽裕的环境中生长,没有失业烦恼,然易见异思迁换工作,中年遇失败後,会一切顺利,尤其能享受晚年财运,须注意罹患肾脏系统疾病。",
  },
  {
    name: "牛",
    text: "[肖牛]个性：富幽默感及敏锐的观察力，行事积极，对工作或异性设想周到且细腻，其创见常令人激赏，具敏锐的观察力。",
    tips: "特征：年轻时，在变化多端的环境中，度过操劳的日子，但有坚忍的独立性，年轻时，会为自己的前途散布辛劳的根源。进入中年期，会分为成功大道与沈没于逆境两条路。到四十五、六岁有第二个开拓良好机运的机会，如能抑制唯我独尊的性情，到晚年便能平安。",
  },
  {
    name: "虎",
    text: "[肖虎]个性：意志坚强且活跃，为领导人物，但因这些性格遇到困难会受打击而身败名裂。",
    tips: "特征：胆大，做事果决，年轻时就会出人头地，中年时若能把握年轻时机运则会成功，若不能把握机运，则会在人际关系中衰败下来，不再成功。寅年出生的人，担任公教人员为宜，且要自爱，不要有贪念与争功的歪念。注意呼吸系统，消化系统的疾病。",
  },
  {
    name: "兔",
    text: "[肖兔]个性：做事从容且具幽默感，为受欢迎的社交家。然而，却有急性及见异思迁的缺点.",
    tips: "特征：不管任何场合，都能受上司赏识。中年时若投机会埋灭一生，切注意要踏实做事，才能安稳生活。",
  },
  {
    name: "龙",
    text: "[肖龙]个性：明朗、活跃的社交家，对事情容易发生兴趣，其缺点是容易热衷也易失去兴趣。",
    tips: "特征：大部分与亲人之感情为薄，然在社会上却受欢迎。早年就能发挥潜力，进入中年期需注意无谓的野心，恐怕会身败名裂。若能克服野心，按部就班地照计划完成各项事情，必有最佳回报。最适合的职业为从事教育工作，须注意循环系统的疾病。",
  },
  {
    name: "蛇",
    text: "[肖蛇]个性：大部分有自我主张，不容易为外人左右。另外，会盲目信赖他人，也是疑心重的人。",
    tips: "特征：年轻时，生活在温暖的环境，长大後较懒，所以常换工作，对异性不能专情。中年时，应收敛惰性，立定志向，奋发努力。适宜从事刺激性的工作。",
  },
  {
    name: "马",
    text: "[肖马]个性：大部分头脑转得快，行动轻敏，有开朗的个性，尊重师长，双亲，性情活泼但又不乏沉稳。",
    tips: "特征：是标准的行动派，订立了目标，便努力迈进，年轻时就会露头角，中年若能维持不变，养成耐性才能有所成就，适宜在艺术，教育职位方面求发展。注意心脏系统的疾病。",
  },
  {
    name: "羊",
    text: "[肖羊]个性：大部分为深思熟虑，研究心强。因此，有神经质且胆怯，做事拖泥带水。",
    tips: "特征：虽然年轻时生活安稳，但恐十年代时，会患大疾。中年时是大展鸿图的好机会，因研究心强，若努力研究，能获高的地位，也能致富。特别注意消化器系统的疾病。",
  },
  {
    name: "猴",
    text: "[肖猴]个性：才华洋溢，富辩才，进取心强，待人亲切，富同情心。",
    tips: "特征：有灵敏的心思，有待人的素养，年少即受人注目，口才灵巧，反应快，年轻时便得好职位。但因有机心，恐会失去良好地位，特别注意一点，较适宜从事推销工作。注意关节方面的疾病。",
  },
  {
    name: "鸡",
    text: "[肖鸡]个性：大部分为规规矩矩且热心工作，并注重穿着，广交朋友。",
    tips: "特征：年轻时，不愿受束缚，喜欢过自由自在的生活方式，因此在工作上无法定心，常换工作，三十岁以後，才会稍微收心。四十至五十岁为黄金时代，应把握时机，好好发挥才能。从事业务方面工作较合适，注意由偏食引起的疾病.",
  },
  {
    name1: "狗",
    text: "[肖狗]个性：大都分尽责且保守。因此，较固执，不易接受他人的意见.",
    tips: "特征：虽然能够成为团体中的干部，然而，常为了工作上的问题，与上司争议，而丢弃辛苦得来的工作.",
  },
  {
    name: "猪",
    text: "[肖猪]个性：大部分为坚定意志者，有爱心及人情味，然而做事有时缺乏考虑。",
    tips: "特征：年轻时，对家庭不满，但心里却仍敬爱双亲，性格诚实，自视甚高，常吃亏。亥年出生的晚年都很幸福，中年以後能慢慢发挥才能。需注意呼吸及消化系统的疾病。",
  },
];

const monthName = [
  "<a  onmouseout='hidetip2()' onmouseover=showtip2(this,event,'12月22日-1月20日','-1','★山羊座(摩羯座)★\\n　　优点：做事脚踏实地，意志力强，有家庭观念，对人谦逊，处处谨慎....&nbsp;。\\n　　缺点：固执,不够乐观,个人利己主义,缺乏浪漫情趣,太专注於个人的目标。\\n1月22日-2月21日　★水瓶座★　请看下月...') href='#'>JAN",
  "<a  onmouseout='hidetip2()' onmouseover=showtip2(this,event,'1月22日-2月21日','-1','★水瓶座★\\n　　优点：崇尚自由，兴趣广泛，创意十足，有理性的智慧，感情忠实。\\n　　缺点：缺乏热情，过於强调生活的自主权，太过理智情趣不足，多管闲事。\\n2月22日-3月21日　★双鱼座★　　请看下月...') href='#'>FEB",
  "<a  onmouseout='hidetip2()' onmouseover=showtip2(this,event,'2月22日-3月21日','-1','★双鱼座★\\n　　优点：感情丰富，心地仁慈，舍己为人，不自私，懂得包容，温和且浪漫。\\n　　缺点：不够实际，太情绪化，多愁善感，不善理财，感情用事。\\n3月22日-4月20日　★白羊座★　请看下月...') href='#'>MAR",
  "<a  onmouseout='hidetip2()' onmouseover=showtip2(this,event,'3月22日-4月20日','-1','★白羊座★\\n　　优点：做事积极，热情有活力，有明快的决断力，坦白率真，重情讲义气。\\n　　缺点：自我中心太强，粗心大意，容易脑羞成怒，缺乏时间观念缺乏耐性。\\n4月21日-5月21日　★金牛座★　请看下月...') href='#'>APR",
  "<a  onmouseout='hidetip2()' onmouseover=showtip2(this,event,'4月21日-5月21日','-1','★金牛座★\\n　　优点：耐性十足，脚踏实地，一往情深，有艺术天份，做事有计划有规律。\\n　　缺点：占有欲太强，善妒，缺乏幽默感，不知变通，缺乏求新求变的勇气。\\n5月22日-6月21日　★双子座★　请看下月...') href='#'>MAY",
  "<a  onmouseout='hidetip2()' onmouseover=showtip2(this,event,'5月22日-6月21日','-1','★双子座★\\n　　优点：有高人一等的幽默感，有天生的语言才华，反应较快，学习能力强。\\n　　缺点：付出少却要得多，喜欢批评别人而不检讨自己，做任何事都欠耐心。\\n6月22日-7月21日　★巨蟹座★　请看下月...') href='#'>JUN",
  "<a  onmouseout='hidetip2()' onmouseover=showtip2(this,event,'6月22日-7月21日','-1','★巨蟹座★\\n　　优点：情感真挚深切，想像力丰富，念旧重情，懂得体贴关怀，善解人意。\\n　　缺点：提不起放不下，说话拐弯抹角，不直接，不知适可而止，缺乏理性。\\n7月22日-8月21日　★狮子座★　请看下月...') href='#'>JUL",
  "<a  onmouseout='hidetip2()' onmouseover=showtip2(this,event,'7月22日-8月21日','-1','★狮子座★\\n　　优点：一言九鼎有信用，乐观，心胸宽大，懂得宽恕具有激励人心的气质。\\n　　缺点：死爱面子活受罪，缺乏节俭的美德，刚愎自用，自以为是缺乏耐性。\\n8月22日-9月21日　★处女座★　请看下月...') href='#'>AUG",
  "<a  onmouseout='hidetip2()' onmouseover=showtip2(this,event,'8月22日-9月21日','-1','★处女座★\\n　　优点：追求完美谦逊不夸大，有精确的观察力，对爱情忠实守本份有耐性。\\n　　缺点：太过吹毛求疵，有洁癖顷向，不够浪漫不尊重他人的梦想，欠远见。\\n9月22日-10月21日　★天秤座★　请看下月...') href='#'>SEP",
  "<a  onmouseout='hidetip2()' onmouseover=showtip2(this,event,'9月22日-10月21日','-1','★天秤座★\\n　　优点：公平客观，天生的优雅风采，浪漫的恋爱高手，能屈能伸适应力强。\\n　　缺点：优柔寡断，犹豫不决，总是自愿其说，藉囗太多，爱享受好逸恶劳。\\n10月22日-11月21日　★天蝎座★　请看下月...') href='#'>OCT",
  "<a  onmouseout='hidetip2()' onmouseover=showtip2(this,event,'10月22日-11月21日','-1','★天蝎座★\\n　　优点：对朋友讲义气，天生的性感魅力，对人生有潜在的热情，恩怨分明。\\n　　缺点：占有欲过高，爱吃醋，得理不饶人，囗是心非，城府太深报复心强。\\n11月22日-12月21日　★人马座（射手座）★　请看下月...') href='#'>NOV",
  "<a  onmouseout='hidetip2()' onmouseover=showtip2(this,event,'11月22日-12月21日','-1','★人马座（射手座）★\\n　　优点：天生乐观，正直坦率，有救世救人的热情，待人友善，经得起打击。\\n　　缺点：心直囗快，容易得罪人，不信邪，不听劝告，冲动，不懂三思而行。\\n12月22日-1月20日　★山羊座(摩羯座)　★请看1月...') href='#'>DEC",
];

function cDay(d) {
  var s;

  switch (d) {
    case 10:
      s = "初十";
      break;
    case 20:
      s = "二十";
      break;
    case 30:
      s = "三十";
      break;
    default:
      s = nStr2[Math.floor(d / 10)];
      s += nStr1[d % 10];
  }

  return s;
}

function drawCld(SY, SM) {
  var i, sD, s, size, bsms, rmms, SY2, yDisplay, GZ, YMBG;
  cld = new calendar(SY, SM);

  console.log("=cld==", cld);

  if (SY > 1874 && SY < 1909)
    yDisplay = "光绪&nbsp;" + (SY - 1874 == 1 ? "元" : SY - 1874);
  if (SY > 1908 && SY < 1912)
    yDisplay = "宣统&nbsp;" + (SY - 1908 == 1 ? "元" : SY - 1908);
  if (SY > 1911 && SY < 1949)
    yDisplay = "民国&nbsp;" + (SY - 1911 == 1 ? "元" : SY - 1911);
  if (SY > 1948 && SY < 1950)
    yDisplay = "中华人民共和国" + (SY - 1948 == 1 ? "成立" : SY - 1948);
  if (SY > 1949)
    yDisplay = "中华人民共和国成立" + (SY - 1949 == 1 ? "元" : SY - 1949);
  if (SM == 0) {
    SY2 = SY - 1;
  } else {
    SY2 = SY;
  }

  GZ = (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Text style={{ color: "#FFCC00" }}>●</Text>
      <Text>
        {Animals[(SY2 - 4) % 12].name}年[农历{cyclical(SY2 - 1900 + 36)}年]
      </Text>
      <Image
        src={images[`ShengXiao_${((SY2 - 4) % 12) + 1}`]}
        style={{ width: 25, height: 25, marginLeft: 10 }}
      ></Image>
    </View>
  );
  YMBG = monthName[SM] + "&nbsp;" + SY;
  const days: DaysProp = [];
  for (i = 0; i < 42; i++) {
    let temp: { sObj: DayProp; lObj: DayProp } = {
      sObj: { text: "", background: "", color: "" },
      lObj: { text: "", color: "" },
    };
    sD = i - cld.firstWeek;
    if (sD > -1 && sD < cld.length) {
      temp.sObj.text = sD + 1;
      if (cld[sD].isToday) temp.sObj.background = "images/bk.gif";
      temp.sObj.color = cld[sD].color;

      // lunarFestival >> solarFestival >> solarTerms >> lDay
      let t1: DayProp = { text: "", color: "", background: "" };
      let t2: DayProp = { text: "", color: "", background: "" };
      let t3: DayProp = { text: "", color: "", background: "" };
      let t4: DayProp = { text: "", color: "", background: "" };

      t1.text = cld[sD].lunarFestival;
      if (t1.text.length > 0) {
        if (t1.text.length > 4) {
          t1.text = `${s.substr(0, 3)}…`;
          t1.color = "#C49402";
        }
      } else {
        t2.text = cld[sD].solarFestival;
        if (t2.text.length > 0) {
          size =
            t2.text.charCodeAt(0) > 0 && t2.text.charCodeAt(0) < 128 ? 8 : 4;
          if (t2.text.length > size + 1)
            t2.text = t2.text.substr(0, size - 1) + "…";
          t2.color = "#FF8000";
        } else {
          console.log("cld[sD].solarTerms", cld[sD].solarTerms);

          t3.text = cld[sD].solarTerms;
          if (t3.text.length > 0) t3.color = "#309F00";
        }
      }
      if (cld[sD].lDay == 1) {
        rmms = cld[sD].isLeap ? "闰" : "";
        if (rmms != "") {
          bsms = "";
        } else {
          bsms = monthDays(cld[sD].lYear, cld[sD].lMonth) == 29 ? "小" : "大";
        }
        t4.text = rmms + cld[sD].lMonth + "月" + bsms;
      } else {
        t4.text = cDay(cld[sD].lDay);
      }

      // 处理
      temp.lObj = {
        text: t1.text || t2.text || t3.text || t4.text,
        color: t1.color || t2.color || t3.color || t4.color,
        background:
          t1.background || t2.background || t3.background || t4.background,
      };
    }
    days.push(temp);
  }
  console.log("--days---", days);

  return { GZ, YMBG, days };
}
