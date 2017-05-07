/**
 * 审核规则设置
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>审核规则设置管理</h2>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data"></Table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                columns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="info" size="small" @click="set(${index})"><Icon type="gear-b"></Icon>设置</i-button>`;
                        }
                    }
                ],
                data: [
                    {
                        name: '124142'
                    },
                    {
                        name: '124142'
                    }
                ]
            }
        },
        methods: {
            set: function(index) {

            }
        }
    }
</script>