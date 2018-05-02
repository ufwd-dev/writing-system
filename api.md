writer: 
==========================

## POST /api/account/session
登陆
```
{
    name: string,
    password: string
}
```
## delete /api/account/session
注销

## POST /api/article
创建一篇文章
```
{
    content: string,
    abstract: string,
    thumb: string,
    published: boolean
}
```

## GET /api/article?keyword=string&published=boolean&examine=boolean
查看自己创建的所有文章

## GET /api/article/:articleId
查看自己创建的某篇文章

## PUT /api/article/:articleId
修改自己创建的某篇文章
```
{
    content: string,
    abstract: string,
    thumb: string,
    published: boolean
}
```

## DELETE /api/article/:articleId
删除自己创建的某篇文章(未发布的可以删)

## POST /api/article/:articleId/category/:categoryId
给某篇文章分类
```
{}
```

## GET /api/category/:categoryId/article
获取该作者的某一分类的所有文章

## GET /api/category?keyword=string
获取所有的分类列表

## GET /api/article/:articleId/category
获取所有的分类列表