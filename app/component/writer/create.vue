<template>
    <editor>
        <template slot-scope="article" >
            <b-button size="sm" @click="create(article.articleContent, article.createClassification, article.editor, article.getArticleList)"
			class="mr-2">
                创建
            </b-button>
			<b-button size="sm" @click="publish(article.articleContent, article.createClassification, article.editor, article.getArticleList)" class="mr-2">
				提交审核
			</b-button>
			<b-button size="sm" type="reset" pressed.sync=false class="mr-2">
				重置
			</b-button>
        </template>
    </editor>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import dateFormat from 'dateformat';

import Editor from './editor.vue';

export default {
	name: 'createArticle',
    components: {
		Editor
    },
    methods: {
        createArticle(published, articleContent, createClassification, editor, getArticleList) {
			const article = _.pick(articleContent, ['title', 'content', 'abstract']);
			
			article.published = false;
			
            return axios.post('/api/article', article).then(res => {
				const id = res.data.data.id;
				
                createClassification(id, articleContent.category).then(() => {
					axios.put(`/api/article/${id}`, {
						published: published
					}).then(() => {
						console.log(1111111);
						getArticleList();
					});
				});
            }).then(() => {
				this.reset(articleContent, editor);
			});
		},
		create(articleContent, createClassification, editor, getArticleList) {
			const published = false;
			
			if (articleContent.title === '') {
				return false;
			}

			this.createArticle(published, articleContent, createClassification, editor, getArticleList);
        },
		publish(articleContent, createClassification, editor, getArticleList) {
			const published = true;
			
			if (articleContent.title === '' || articleContent.content === '') {
				return false;
			}

			this.createArticle(published, articleContent, createClassification, editor, getArticleList);
		},
		reset(articleContent, editor) {
			articleContent.title = '';
			articleContent.content = '';
			articleContent.abstract = '';
			articleContent.category = [];
			articleContent.published = false;

			editor.setData(articleContent.content);
		}
	}
}
</script>

