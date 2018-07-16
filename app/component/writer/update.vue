<template>
	<editor :articleId="articleId">
		<template slot-scope="article">
			<div v-if="article.articleContent.examine === false">
				<b-alert show variant="danger">
					审核意见：{{article.articleContent.comments}}
				</b-alert>
			</div>
			<b-button size="sm" @click="update(article.articleContent, article.oldCategory, article.createClassification)"
				class="mr-2">
                保存修改
            </b-button>
			<b-button size="sm"
				@click="shown"
				class="mr-2">
				提交审核
			</b-button>
			<b-modal v-model="success"
				id="keep"
				title="提示">
				<b-container fluid>
					<p>保存成功</p>
				</b-container>
				<div slot="modal-footer" class="float-right">
					<b-btn size="sm" variant="primary" @click="success=false">
					确定
					</b-btn>
				</div>
			</b-modal>
			<b-modal v-model="show"
			    id="tooltips"
				title="提示">
				<b-container fluid>
					<p>是否要提交文章？提交之后你将失去对文章的修改机会</p>
				</b-container>
				<div slot="modal-footer" class="float-right">
					<b-btn size="md" variant="primary" @click="publish(article.articleContent, article.oldCategory, article.createClassification)">
					是
					</b-btn>
					<b-btn size="md" variant="primary" @click="show=false">
					否
					</b-btn>
				</div>
			</b-modal>
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
			show: false,
			success: false
        }
	},
	computed: {
		articleId() {
			return this.$route.params.id;
		}
	},
    components: {
		Editor
    },
    methods: {
		shown() {
			this.show = true;
		},
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

			console.log(this.articleId, this.$route.params.id);

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
			});
		},
        update(articleContent, oldCategory, createClassification) {
			const published = false;
			
			if (articleContent.title === '') {
				return false;
			}

			this.put(articleContent, published, oldCategory, createClassification).then(() => {
				this.success = true;
			});
		},
		publish(articleContent, oldCategory, createClassification) {
			const published = true;
			
			if (articleContent.title === '' || articleContent.content === '') {
				return false;
			}

            this.put(articleContent, published, oldCategory, createClassification).then(() => {
				this.$router.push('/article');
			});
		}
	}
}
</script>