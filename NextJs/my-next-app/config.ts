import {z} from 'zod';
const configSchema = z.object({
    NEXT_PUBLIC_API_ENDPOINT: z.string(),
})

const configProject = configSchema.safeParse({
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
});
console.log(configProject);


if(!configProject.success){
    throw new Error("có lỗi xảy ra khi đọc file config");
}

const envConfig = configProject.data;

export default envConfig;