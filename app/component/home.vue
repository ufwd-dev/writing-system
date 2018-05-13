<template>
	<b-container fluid style="padding: 0px" class="bv-example-row">
		<b-navbar toggleable="md" type="dark" variant="info" style="padding-left: 120px;padding-right: 120px">
			<b-navbar-brand>统战APP内容管理平台</b-navbar-brand>
			<b-navbar-nav class="ml-auto">
				<b-nav-item-dropdown right>
					<template slot="button-content">
						<i class="fa fa-user fa-fw"></i>用户
					</template>
					<b-dropdown-item href="#">账户名：{{this.name}}</b-dropdown-item>
					<b-dropdown-item href="#">频道：{{this.channel}}</b-dropdown-item>
					<b-dropdown-item @click="signOut">登出</b-dropdown-item>
				</b-nav-item-dropdown>
			</b-navbar-nav>
		</b-navbar>
		<b-row style="margin-top: 7rem;">
			<b-col>
				<b-table :items="items" :fields="fields">
					<template slot="operation" slot-scope="row">
						<b-button size="sm" @click.stop="updateArticle(row)" class="mr-2">
							编辑
						</b-button>
						<b-button size="sm" @click.stop="deleteArticle(row)" class="mr-2">
							删除
						</b-button>
					</template>
				</b-table>
			</b-col>
			<b-col>
				<b-form
            ref="articleContent"
            class="text-left">
					<b-form-group
						label="标题:"
						label-for="title">
						<b-form-input id="title"
							type="text"
							v-model="articleContent.title"
							required
							placeholder="请输入文章标题">
						</b-form-input>
					</b-form-group>
					<b-form-group
						label="摘要:"
						label-for="abstract">
						<b-form-textarea id="textarea1"
							v-model="articleContent.abstract"
							placeholder="请输入文章摘要"
							:rows="3"
							:max-rows="6">
						</b-form-textarea>
					</b-form-group>
					<b-form-group label="文章类别:">
						<b-form-checkbox-group id="checkboxes2" name="flavour2" v-model="articleContent.category"
							:options="categoryList">
						</b-form-checkbox-group>
					</b-form-group>
					<b-form-group>
						<b-button size="sm" @click="create" class="mr-2">
							保存
						</b-button>
						<b-button size="sm" @click="publish" class="mr-2">
							发布
						</b-button>
						<b-button size="sm" type="reset" pressed.sync=false class="mr-2">
							重置
						</b-button>
					</b-form-group>
					<div :class="{'document-editor':!isFullScreen,'FullScreen': isFullScreen}">
						<div ref="toolbar" class="document-editor__toolbar"></div>
						<div class="document-editor__editable-container">
							<b-button class="danger" @click="isFullScreen = true" v-if="!isFullScreen">
								<i class="fa fa-arrows-alt"></i>
								</b-button>
							<b-button class="danger" @click="isFullScreen = false" v-if="isFullScreen">
								<i class="fa fa-compress"></i>
							</b-button>
							<div ref="editor" class="document-editor__editable">
								<div class="ck-content">
									<h3>Insert the article content here</h3>
								</div>
							</div>
						</div>
					</div>
				</b-form>
			</b-col>
    	</b-row>
	</b-container>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import dateFormat from 'dateformat';

// import ArticleList from './writer/list.vue';
// import CreateArticle from './writer/create.vue';

import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import GFMDataProcessor from '@ckeditor/ckeditor5-markdown-gfm/src/gfmdataprocessor';

import UploadAdapter from '../adapter';

export default {
	name: 'home',
	// components: {
	// 	ArticleList,
	// 	CreateArticle
	// },
	data() {
		return {
			categoryList: [],
			name: '',
			channel: '',
			channelId: null,
			fields: [ 'id', 'title', 'created_at', 'updated_at', 'operation'],
			items: [],
			articleContent: {
				title: '',
				content: '',
				abstract: '',
                category: []
			},
			oldCategory: [],
			editor: {},
			isFullScreen: false,
			isChange: false,
			isUpdate: false,
			articleId: ''
		}
	},
	methods: {
		getArticleList() {
            return axios.get('/api/article?published=false').then(res => {
				const data = res.data.data;

				data.forEach(element => {
					element.created_at = dateFormat(element.created_at, 'yyyy/mm/dd  HH:MM');
					element.updated_at = dateFormat(element.updated_at, 'yyyy/mm/dd  HH:MM');
				});

				this.items = data;
			})
		},
		updateArticle(row) {
			const id = row.item.id;

			return axios.get(`/api/article/${id}`).then(res => {
                const mixedArticle = _.pick(res.data.data, [
					'title', 'content', 'abstract'
				]);

				this.editor.setData(mixedArticle.content);

				mixedArticle.published = false;
				mixedArticle.category = [];

				this.articleContent = mixedArticle;

				this.isUpdate = true;

				this.articleId = id;
            }).then(() => {
				this.getArticleCategoryList(id);
			});
		},
		getArticleCategoryList(id) {

			return axios.get(`/api/article/${id}/category`).then(res => {
				const categoryList = res.data.data;

				categoryList.forEach(category => {
                    this.oldCategory.push(category.categoryId);
					
                    this.articleContent.category.push(category.categoryId);
                });
            });
		},
		changeClassification(newList) {

			const createList = this.articleContent.category.filter(category => {
				return this.oldCategory.indexOf(category) === -1;
			});

			const deleteList = this.oldCategory.filter(category => {
				return this.articleContent.category.indexOf(category) === -1;
			});

			return {
				createList, deleteList
			};
			
		},
		deleteArticle(row) {
			const id = row.item.id;

			return axios.delete(`/api/article/${id}`).then(res => {
				this.getArticleList();
            });
		},
		signOut() {
			this.$store.dispatch('signOut').then(() => {
				this.$router.push('/writer/signin');
			})
		},
		getInformation() {
			return axios.get('/api/account').then(({data}) => {
				this.name = data.data.name;

				this.channel = data.data.channel;
			})
		},
		createArticle(published) {
			const article = _.pick(this.articleContent, ['title', 'content', 'abstract']);
			
			article.published = false;
			
            return axios.post('/api/article', article).then(res => {
				const id = res.data.data.id;
				
                this.createClassification(id, this.articleContent.category).then(() => {
					axios.put(`/api/article/${id}`, {
						published: published
					}).then(() => {
						this.getArticleList();
					});
				});
            }).then(() => {
				this.reset();
			});
		},
		createClassification(id, list) {

			return axios.post(`/api/article/${id}/category`, {
				list: list
			});
		},
        create() {
			const published = false;
			
			if (this.articleContent.title === '') {
				return false;
			}

			if (!this.isUpdate) {
				this.createArticle(published);
			} else {
				this.put(published);
			}
        },
        publish() {
			const published = true;
			
			if (this.articleContent.title === '' || this.articleContent.content === '') {
				return false;
			}

            if (!this.isUpdate) {
				this.createArticle(published);
			} else {
				this.put(published);
			}
		},
		put(published) {
			const article = _.pick(this.articleContent, ['title', 'content', 'abstract']);
			const {createList, deleteList} = this.changeClassification(this.articleContent.category);

			article.published = false;

            return axios.put(`/api/article/${this.articleId}`, article).then(res => {
                this.createClassification(this.articleId, createList);
            }).then(() => {
				deleteList.forEach(category => {
					axios.delete(`/api/article/${this.articleId}/category/${category}`, {
						list: createList
					});
				});
			}).then(() => {
				axios.put(`/api/article/${this.articleId}`, {
					published: published
				}).then(() => {
					this.getArticleList();
				});
			}).then(() => {
				this.reset();
			});
		},
		reset() {
			this.articleContent.title = '';
			this.articleContent.content = '';
			this.articleContent.abstract = '';
			this.articleContent.category = [];
			this.articleContent.published = false;
			this.isUpdate = false;

			this.editor.setData(this.articleContent.content);
		},
		createEditor() {
			
			function Markdown( editor ) {
				editor.data.processor = new GFMDataProcessor();
			}

			DecoupledEditor.build.plugins.push(Markdown);

			return DecoupledEditor.create(this.$refs.editor).then(editor => {
				this.editor = editor;
				this.$refs.toolbar.appendChild( editor.ui.view.toolbar.element );
				
				editor.plugins.get( 'FileRepository' ).createUploadAdapter = function( loader ) {
					return new UploadAdapter( loader );
				};
			
				editor.model.document.on('change', () => {
					this.articleContent.content = editor.getData();
				});


			}).catch( error => {
				console.error( error );
			});

		}
	},
	mounted() {
		this.createEditor().then(() => {
			
			axios.get('/api/category').then(res => {
                const categoryList = res.data.data;
                
                categoryList.forEach(category => {
                    this.categoryList.push({
                        text: category.name,
                        value: category.id
                    });
                });
			});

		}).then(() => {

			if (this.id) {
	
				axios.get(`/api/tju/service/article/${this.id}`).then(res => {
					this.articleContent = res.data.data;
	
					this.editor.setData(this.articleContent.content);
				});
			}
		});

		this.getInformation()
		this.getArticleList();
	}
}
</script>

<style>
.document-editor {
    border: 1px solid var(--ck-color-base-border);
    border-radius: var(--ck-border-radius);
	max-height: 700px;
	width: auto;
    display: flex;
    flex-flow: column nowrap;
	overflow: hidden;
}

.FullScreen {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 100
}

.document-editor__toolbar {
    z-index: 1;
    box-shadow: 0 0 5px hsla( 0,0%,0%,.2 );
    border-bottom: 1px solid var(--ck-color-toolbar-border);
}

.document-editor__toolbar .ck-toolbar {
    border: 0;
    border-radius: 0;
}
.document-editor__editable-container {
    padding: calc( 2 * var(--ck-spacing-large) );
    background: var(--ck-color-base-foreground);
	height: 100%;

    /* Make it possible to scroll the "page" of the edited content. */
    overflow-y: scroll;
}

.document-editor__editable-container .ck-editor__editable {
    /* Set the dimensions of the "page". */

    /* Keep the "page" off the boundaries of the container. */
    /* padding: 1cm 2cm 2cm; */
    padding: 50px 100px 100px;

    border: 1px hsl( 0,0%,82.7% ) solid;
    border-radius: var(--ck-border-radius);
    background: white;
    box-shadow: 0 0 5px hsla( 0,0%,0%,.1 );
    margin: 0 auto;
}
.document-editor__editable-container figcaption.ck-editor__editable {
	width: auto;
}
</style>
