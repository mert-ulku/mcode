<template>
    <div>
        <div v-if="param.type == selectType" class="first-item">
            <label for="">{{param.placeholder}}</label>
            <select :name="param.name" id="" v-model="param.value" class="form-control" @change="$emit('selected')">
                <option :key="index"  :value="val" v-for="(val, index) in param.values">{{val.label}}</option>
            </select>
        </div>

        <div v-if="param.type == textType" class="first-item">
            <label for="">{{param.placeholder}}</label>
            <input :name="param.name" type="text" v-model="param.value" class="form-control">
        </div>

    </div>
</template>

<script>

    export default {
        name: "Parameter",
        props: {
            param: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                selectType: 'select',
                textType: 'text'
            }
        }
    }

</script>
