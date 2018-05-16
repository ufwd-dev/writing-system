<template>
	<b-container fluid style="padding: 0">
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
		<b-row style="margin: 0;height: 100%">
			<b-col cols="2">
				<div class="bd-sidebar">
					<div @click="jump" class="bd-search d-flex align-items-center">
						新建<i class="fa fa-plus fa-lg" aria-hidden="true"></i>
					</div>
					<nav class="bd-links navbar-collapse collapse show">
						<div class="bd-docs-item"
							v-for="(item, index) in items"
							v-bind:key="index" @click.stop="updateArticle(item.id)">
							<span class="bd-toc-link"
								>{{item.title}}</span>
						</div>
					</nav>
					<b-list-group flush>
						
					</b-list-group>
				</div>
			</b-col>
			<b-col cols="9"  style="margin: 3rem 0 0 0;">
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
						<slot
							:articleContent="articleContent"
							:reset="reset"
							:getArticleList="getArticleList"
							:createClassification="createClassification"
							:editor="editor"
							:oldCategory="oldCategory"
						></slot>
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

import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import GFMDataProcessor from '@ckeditor/ckeditor5-markdown-gfm/src/gfmdataprocessor';

import UploadAdapter from '../../adapter';

export default {
	name: 'home',
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
		}
	},
	props: ['articleId'],
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
		getArticleCategoryList(id) {

			return axios.get(`/api/article/${id}/category`).then(res => {
				const categoryList = res.data.data;

				categoryList.forEach(category => {
                    this.oldCategory.push(category.categoryId);
					
                    this.articleContent.category.push(category.categoryId);
                });
            });
		},
		createClassification(id, list) {

			return axios.post(`/api/article/${id}/category`, {
				list: list
			});
		},
		updateArticle(id) {
			return axios.get(`/api/article/${id}`).then(res => {
                const mixedArticle = _.pick(res.data.data, [
					'title', 'content', 'abstract'
				]);

				this.editor.setData(mixedArticle.content);

				mixedArticle.published = false;
				mixedArticle.category = [];

				this.articleContent = mixedArticle;

				this.$router.push(`/article/${id}`);
            }).then(() => {
				this.getArticleCategoryList(id);
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
		reset() {
			this.articleContent.title = '';
			this.articleContent.content = '';
			this.articleContent.abstract = '';
			this.articleContent.category = [];
			this.articleContent.published = false;

			this.editor.setData(this.articleContent.content);
		},
		jump() {
			this.$router.push('/article');
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
			}).then(() => {
				this.getInformation();
			}).then(() => {
				this.getArticleList();
			});
		}).then(() => {
			if (this.articleId) {
	
				this.updateArticle(this.articleId);
			}
		});

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
.bd-sidebar {
    position: sticky;
    z-index: 1000;
    height: calc(100vh - 4rem);
	overflow-y: auto;
	margin-left: -15px;
	text-align: center
}
.bd-search {
    position: relative;
    padding: 1rem 15px;
    border-bottom: 1px solid rgba(0,0,0,.05);
}
.align-items-center {
    align-items: center !important;
}
.d-flex {
    display: flex !important;
}
.bd-links {
    display: block !important;
	padding-top: 1rem;
	padding-bottom: 1rem;
}
.navbar-collapse {
    flex-basis: 100%;
    flex-grow: 1;
    align-items: center;
}
.bd-toc-item.active {
    margin-bottom: 1rem;
}
.bd-toc-item.active > .bd-toc-link {
    color: rgba(0,0,0,.85);
}
.bd-navbar .navbar-nav .nav-link.active, .bd-toc-link {
    font-weight: 400;
}
.bd-toc-link {
    display: block;
    padding: .25rem 1.5rem;
	overflow-x: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>
