<template>
    <div class="container">
        <form @submit.prevent="submitForm">
            <div class="row mt-4">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            New Rule Setup
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label for="urlName">Name</label>
                                <input class="form-control" id="urlName" placeholder="Enter Rule Name" type="text"
                                       v-model="ruleInit.name">
                            </div>
                            <div class="form-group">
                                <label for="urlList">URL List</label>
                                <select class="form-control" id="urlList" v-model="ruleInit.selectedUrlList" >
                                    <option :key="index" v-for="(urlList, index) in ruleInit.urlLists">{{urlList}}
                                    </option>
                                </select>
                            </div>
                            <div class="alert alert-secondary mt-2 text-center"
                                 v-if="ruleInit.selectedUrlList == 'Select URL List' || !ruleInit.name">
                                Please enter an URL name and select an URL list
                            </div>

                        </div>
                    </div>

                </div>
                <div class="col-md-12 mt-3">
                    <div class="rules">
                        <div :key="Math.random() + index" v-for="(rule, index) in ruleInit.rules">
                            <Rule :rule="rule" @addCondition="addCondition" @remove="remove(index)"/>
                            <span class="seperator-or my-2" v-if="index !== ruleInit.rules.length - 1">OR</span>
                        </div>
                        <div class="my-2" v-if="ruleInit.rules.length">
                            <span class="seperator-or">OR</span>
                            <button @click.prevent="addRule" class="d-flex btn btn-secondary btn-xs mt-3"><i class="material-icons">add</i>OR</button>
                        </div>
                    </div>
                    <button class="btn btn-success mt-3 float-right my-3" type="submit">Save</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

    import Rule from './Rule'
    import lodash from 'lodash'

    export default {
        name: 'RuleInit',
        components: {
            Rule
        },
        data() {
            return {
                ruleInit: {
                    name: '',
                    urlLists: ['Select URL List', 'Sem URL List'],
                    selectedUrlList: 'Select URL List',
                    rules: []
                }
            }
        },
        watch: {
          'ruleInit.selectedUrlList' (){
            if(!this.ruleInit.rules.length){
                this.addRule()
            }
          } 
        },
        computed: {
            finalResult(){

                let values = lodash.cloneDeep(this.ruleInit)

                
                values.rules = values.rules.map(rule => {
                    
                    let mapVals = rule 

                    mapVals.conditions = mapVals.conditions.map(condition => {

                        let conditionVal = {
                            type: condition.type.value
                        }

                        if (condition.params) {

                            condition.params.forEach(item => {

                                if(typeof item.value != 'object'){
                                    conditionVal[item.name] = item.value

                                } else {

                                    conditionVal[item.name] = item.value.value

                                    if(item.value.params){

                                        item.value.params.forEach(e => {
                                        conditionVal[e.name] = typeof e.value != 'object' ? e.value : e.value.value

                                        })
                                    }
                                }
                            })
                        }

                        return conditionVal

                    })

                    return mapVals 

                })

                return values
            }
        },
        methods: {
            addRule() {
                this.ruleInit.rules.push({
                    conditions: [{
                        type: 'http_header'
                    }]
                })
            },
            addCondition(localRule) {
                localRule.conditions.push({
                    type: 'http_header'
                })
            },
            submitForm() {
                if(this.finalResult){
                    console.log(this.finalResult)
                    alert('Cevap konsolda!')
                }

            
            },
            remove(index){
                this.ruleInit.rules.splice(index, 1)
            }
        }
    }

</script>


<style lang="scss" scoped>


    .seperator-or{

        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        font-weight: bold;
        width: 45px;
        height: 45px;
        color: #fff;
        background-color:#4285f4;
        border-radius: 50%;

        &:before,
        &:after {
            content: '';
            border-top: 2px solid #4285f4;
            flex: 1 0 10rem;
            
        }
    }


</style>
