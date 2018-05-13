<template>
	<div>
        <b-form
            ref="articleContent"
            class="text-left"
			@submit="publish">
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
                <b-button size="sm" @click = "create" class="mr-2">
                    保存
                </b-button>
                <b-button size="sm" type="submit" pressed.sync=false class="mr-2">
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
	</div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import GFMDataProcessor from '@ckeditor/ckeditor5-markdown-gfm/src/gfmdataprocessor';

import UploadAdapter from '../../adapter';

export default {
    name: 'create-article',
	props: ['id'],
	data() {
		return {
			articleContent: {
				title: '',
				content: '',
				abstract: '',
                category: [],
                published: null
			},
			categoryList: [],
			editor: {},
			isFullScreen: false,
			isChange: false
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

	},
	methods: {
		createArticle() {
            const article = _.pick(this.articleContent, ['title', 'content', 'abstract', 'published']);

            return axios.post('/api/article', article).then(res => {
                console.log(res.data);
            });
		},
        create() {
            this.articleContent.published = false;

            this.createArticle();

        },
        publish() {
            this.articleContent.published = true;

            this.createArticle();
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

		},
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


