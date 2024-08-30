/* eslint no-console: off */
const sentiment = require('../src');

const text1 = '我今天得奖了，很高兴，我要将快乐分享大家。';
console.log(`测试文本: ${text1}`);
console.table(sentiment(text1));
console.log('');

const text2 = '新华社记者贾远琨在位于上海第二工业大学校区内的包起帆创新之路陈列馆，参观者络绎不绝，有高校的师生，有工厂的员工……他们来到这里，都为寻找一个答案：创新的持续动力来自上画上创新的句号。包起帆（左）在上海港码头和工友一道研究装卸货物工作中存在的问题（资料照片）。新华社发1987年4月9日，包起帆凭借“15吨滑块式单索多瓣抓斗”项目获第15届到自动化、智能化的数次跨越，他的持续创新和卓越贡献，令主办方都惊诧不已！而他的发明远远不止于抓斗。他参与开辟我国港口首条内贸标准集装箱航线，参与建设我国首座集装箱口生产自动化创新的践行者。40多年来，包起帆连续五届荣获全国劳动模范称号，荣获全国优秀共产党员、第一届全国敬业奉献道德模范称号。';
console.log(`测试文本: ${text2}`);
console.table(sentiment(text2));
console.log('');

const text3 = '悲伤犹如深渊，将我的灵魂吞噬，让我感到无尽的绝望。';
console.log(`测试文本: ${text3}`);
console.table(sentiment(text3));
console.log('');
