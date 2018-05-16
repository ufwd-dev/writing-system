<template>
	<editor :articleId="articleId">
		<template slot-scope="article">
			<b-button size="sm" @click="update(article.articleContent, article.oldCategory, article.createClassification)"
				class="mr-2">
                保存修改
            </b-button>
			<b-button size="sm" @click="publish(article.articleContent, article.oldCategory, article.createClassification)"
				class="mr-2">
				提交审核
			</b-button>
		</template>
	</editor>
</template>

<script>
import axios from 'axios';

import Editor from './editor.vue';

export default {
    name: 'updateArticle',
    data() {
        return {
            articleId: this.$route.params.id
        }
    },
    components: {
		Editor
    },
    methods: {
		changeClassification(ownCategory, oldCategory) {

			const createList = ownCategory.filter(category => {
				return oldCategory.indexOf(category) === -1;
			});

			const deleteList = oldCategory.filter(category => {
				return ownCategory.indexOf(category) === -1;
			});

			return {
				createList, deleteList
			};
			
		},
        put(articleContent, published, oldCategory, createClassification) {
			const article = _.pick(articleContent, ['title', 'content', 'abstract']);
			const {createList, deleteList} = this.changeClassification(articleContent.category, oldCategory);

			article.published = false;

            return axios.put(`/api/article/${this.articleId}`, article).then(res => {
				if (createList.length !== 0) {
					createClassification(this.articleId, createList);
				}
            }).then(() => {
				if (deleteList.length !== 0) {
					deleteList.forEach(category => {
						axios.delete(`/api/article/${this.articleId}/category/${category}`);
					});
				}
			}).then(() => {
				axios.put(`/api/article/${this.articleId}`, {
					published: published
				});
			}).then(() => {
				this.$router.push('/article');
			});
		},
        update(articleContent, oldCategory, createClassification) {
			const published = false;
			
			if (articleContent.title === '') {
				return false;
			}

			this.put(articleContent, published, oldCategory, createClassification);
		},
		publish(articleContent, oldCategory, createClassification) {
			const published = true;
			
			if (articleContent.title === '' || articleContent.content === '') {
				return false;
			}

            this.put(articleContent, published, oldCategory, createClassification);
		}
	}
}
</script>