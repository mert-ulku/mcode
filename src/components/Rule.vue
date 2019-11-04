<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex align-items-center justify-content-between">
                <span>Rule</span>
                <span @click.prevent="removeRule" class="close-button">x</span>
            </div>
        </div>
        <div class="card-body" v-if="localRule">
            <div :key="i" v-for="(condition, i) in localRule.conditions">
                <div class="row d-flex mb-3">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label for="conditionType">Type</label>
                            <select @change="setParams(condition)" class="form-control" id="" name=""
                                    v-model="condition.type">
                                <option :key="conditionType.value" :value="conditionType"
                                        v-for="conditionType in conditionTypes">{{conditionType.label}}
                                </option>
                            </select>
                        </div>

                        <div class="row" v-if="condition.params && condition.params.length">
                            <div :key="index" class="col-md-4" v-for="(param, index) in condition.params">
                                <Parameter :param="param" @selected="$forceUpdate()"/>
                            </div>
                            <template v-for="(param, ind) in condition.params">
                                <div :key="Math.random() + ind" class="col-md-12 mt-3 mb-3"  v-if="param.value.params">
                                    <div class="row">
                                        <div :key="Math.random() + index" class="col-md-4" v-for="(nestedParam, index) in param.value.params">
                                            <Parameter :param="nestedParam"/>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>

                    </div>
                    <div class="col-md-1 mt-4 p-3">
                        <span @click="removeCondition(i)" class="close-button">x</span>
                    </div>
                </div>
                <span class="seperator-and" v-if="i != localRule.conditions.length -1">AND</span>
            </div>
            <button @click.prevent="addCondition"
                    class="d-flex btn btn-xs btn-secondary">
                <i class="material-icons">add</i>
                AND
            </button>
        </div>
    </div>
</template>

<script>

    import Parameter from "./Parameter"
    import lodash from 'lodash'
    import paramValues from "../configs/config"

    export default {
        components: {
            Parameter
        },
        props: {
            rule: {
                type: Object
            }
        },
        name: "Rule",
        data() {
            return {
                localRule: this.rule,
                types: {
                    httpHeader: 'http_header',
                    elements: 'elements'
                },
                paramValues: paramValues,
                conditionTypes: [
                    {
                        value: 'http_header',
                        label: 'HTTP Header'
                    },
                    {
                        value: 'elements',
                        label: 'Elements'
                    }
                ]
            };
        },
        methods: {
            addCondition() {
                this.$emit('addCondition', this.localRule);
            },
            setParams(condition) {
                condition.params = lodash.cloneDeep(this.paramValues[condition.type.value])
            },
            removeCondition(i) {
                this.localRule.conditions.splice(i, 1)
            },
            removeRule() {
                this.$emit('remove')
            }
        }
    }

</script>

<style lang="scss">

    .close-button {
        background: #ea4335;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 2px 6px;

        &:hover {
            background: darken(#ea4335, 10%);
        }
    }

    .seperator-and {

        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        font-weight: bold;
        width: 45px;
        height: 45px;
        background-color: #fbbc05;
        border-radius: 50%;

        &:before,
        &:after {
            content: '';
            border-top: 2px solid #fbbc05;
            flex: 1 0 10rem;

        }

    }

</style>
