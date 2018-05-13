<template>
	<div>
       <b-table :items="items" :fields="fields">
            <template slot="update" slot-scope="row">
                <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
                update
                </b-button>
            </template>
       </b-table>
	</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'article-list',
    data() {
        return {
            fields: [ 'id', 'title', 'abstract', 'created_at', 'updated_at', 'update'],
            items: []
        }
    },
    methods: {
        getArticleList() {
            return axios.get('/api/article?published=false').then(res => {
				this.items = res.data.data;
			})
        }
    },
    mounted() {
        this.getArticleList();
    }
}
</script>