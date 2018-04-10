writer: 
==========================

## POST /api/ufwd/writer/account/session
登陆
```
{
    name: string,
    password: string
}
```
## delete /api/ufwd/writer/account/session
注销

## POST /api/ufwd/writer/artical
创建一篇文章
```
{
    content: string,
    abstract: string,
    thumb: string,
    published: boolean
}
```

## GET /api/ufwd/writer/artical?keyword=string&published=boolean&examine=boolean
查看自己创建的所有文章

## GET /api/ufwd/writer/artical/:articalId
查看自己创建的某篇文章

## PUT /api/ufwd/writer/artical/:articalId
修改自己创建的某篇文章
```
{
    content: string,
    abstract: string,
    thumb: string,
    published: boolean
}
```

## DELETE /api/ufwd/writer/artical/:articalId
删除自己创建的某篇文章(未发布的可以删)

## POST /api/ufwd/writer/artical/:articalId/category/:categoryId
给某篇文章分类
```
{}
```