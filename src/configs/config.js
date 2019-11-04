const httpValues = [

    {
        type: 'select',
        name: 'operand',
        placeholder: 'Operand',
        values: [
            {
                label: 'Select Operand',
                value: ''
            },
            {
                label: 'Status',
                value: 'status'
            },
        ],
        value: '',
        default: ''
    },
    {
        type: 'select',
        name: 'operator',
        placeholder: 'Operator',
        values: [
            {
                label: 'Select Operator',
                value: ''
            },
            {
                label: 'Equals',
                value: 'equals'
            },
            {
                label: 'Not equals',
                value: 'not equals'
            },
            {
                label: 'Less than',
                value: 'less than'
            },
            {
                label: 'Greater than',
                value: 'Greater than'
            }
        ],
        value: '',
        default: ''
    },
    {
        type: 'text',
        name: 'status',
        placeholder: 'Status',
        value: '',
        default: ''
    }

]


const values = {

    http_header: httpValues,
    elements: [
        
        {
            type: 'text',
            name: 'selector_xpath',
            placeholder: 'Selector (XPath)',
            value: '',
            default: ''
        },
        {
            type: 'select',
            name: 'xpath',
            placeholder: 'XPath Template List',
            value: '',
            values: [{
                    label: 'Title',
                    value: 'title',
                    
                    
                },
                {
                    label: 'Body',
                    value: 'body',
                    params: httpValues
                },
                {
                    label: 'Canonical',
                    value: 'canonical',
                },
                {
                    label: 'XPath Template',
                    value: 'xpath_template'
                }
            ],

        }
    ]

}



export default values;