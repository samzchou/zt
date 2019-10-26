<template>
	<section>
		<sam-form :data="formData" />
	</section>
</template>

<script>
import samForm from '~/components/form';
export default {
	components: {
		samForm
	},
	data: () => ({
		formData: {
			isEdit: false,
			gutter : 20,
			colspan: 8,
			itemList: [
				{
					"type": "String",
					"name": "field_1",
					"component": "sam-input",
					"cptype": "text",
					"default": '',
					"label": '专业技术职务'
                },
                {
                    "type": "Number",
                    "name": "field_2",
                    "component": "sam-select",
                    "options": [
                        { "label": "较差", "id": 1 },
                        { "label": "一般", "id": 2 },
                        { "label": "良好", "id": 3 }
                    ],
                    "required": true,
                    "default": 0,
                    "label": '健康状况'
                }
			]
		}
	})
}
</script>
