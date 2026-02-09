<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'

const emit = defineEmits(['add-task', 'close'])

const formSchema = toTypedSchema(
  z.object({
    description: z
      .string()
      .min(1, '请你输入至少超过1个字以上的内容')
      .max(18, '最多只能18个字，请控制字数！用精简的话来说重要的事'),
  }),
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    description: '',
  },
})

const onSubmit = handleSubmit((data) => {
  // 触发自定义事件，传递任务数据
  emit('add-task', { title: data.description })
  // 重置表单
  resetForm()
})

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <Card class="w-full sm:max-w-md m-auto relative">
    <button 
      @click="handleClose" 
      class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold z-10"
    >
      ×
    </button>
    <CardHeader>
      <CardTitle>添加新任务</CardTitle>
      <CardDescription>
        在这里输入你需要添加的备忘录
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form id="form-vee-demo" @submit="onSubmit">
        <FieldGroup>
          <VeeField v-slot="{ field, errors }" name="description">
            <Field :data-invalid="!!errors.length">
              <InputGroup>
                <InputGroupTextarea
                  id="form-vee-demo-description"
                  v-bind="field"
                  placeholder="用精简的话输出你最重要的事情。"
                  :rows="6"
                  class="min-h-24 resize-none"
                  :aria-invalid="!!errors.length"
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText class="tabular-nums">
                    {{ field.value?.length || 0 }}/18 characters
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldError v-if="errors.length" :errors="errors" />
            </Field>
          </VeeField>
        </FieldGroup>
      </form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal">
        <Button type="button" variant="outline" @click="resetForm">
          重置
        </Button>
        <Button type="submit" form="form-vee-demo">
          添加任务
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
