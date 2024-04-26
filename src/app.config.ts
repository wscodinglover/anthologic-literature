export default defineAppConfig({
  pages: ["pages/index/index", "pages/tools/index"],
  subpackages: [
    {
      root: "sub-pages/xici",
      pages: ["index"],
    },
    {
      root: "sub-pages/yijing",
      pages: ["index"],
    },
    {
      root: "sub-pages/yijingup",
      pages: ["index"],
    },
    {
      root: "sub-pages/yijingdown",
      pages: ["index"],
    },
    // 工具
    {
      root: "sub-pages/hanzi",
      pages: ["index"],
    },
    {
      root: "sub-pages/laohuangli",
      pages: ["index"],
    },
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#000000",
    selectedColor: "#000000",
    backgroundColor: "#fff",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "assets/icons/books.png",
        selectedIconPath: "assets/icons/books-active.png",
        text: "书籍",
      },
      {
        pagePath: "pages/tools/index",
        iconPath: "assets/icons/tools.png",
        selectedIconPath: "assets/icons/tools-active.png",
        text: "工具",
      },
    ],
  },
});
