import { defineCollection, z } from 'astro:content';

const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    topic: z.enum([
      '付费点剧作学',
      '结构与节奏',
      '爽感公式',
      '留人与钩子',
      '人物与人设',
      'AI漫剧工作流',
      '平台与过审',
    ]),
    level: z.enum(['入门', '进阶', '实战']),
    summary: z.string(),
    order: z.number().default(99),
    readTime: z.string().default('8 分钟'),
    updated: z.string().default('2026-09'),
  }),
});

const teardownsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    genre: z.string(),
    format: z.enum(['微短剧', 'AI漫剧', '经典影视']),
    episodesOrDuration: z.string(),
    hookTiming: z.string(),
    structureSummary: z.string(),
    takeaways: z.array(z.string()),
    poster: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const templatesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.enum([
      '结构模板',
      '爽点节奏表',
      '分集大纲',
      'Prompt字典',
      '人物小传',
      '小说转剧本',
    ]),
    access: z.enum(['free', 'email', 'pro']),
    fileFormat: z.string().default('Markdown / Notion'),
    description: z.string(),
    highlight: z.string(),
    order: z.number().default(99),
  }),
});

const worksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    format: z.enum(['短剧', 'AI漫剧', '电影', '剧集']),
    episodes: z.union([z.number(), z.string()]),
    status: z.string(),
    role: z.string().default('总编剧'),
    logline: z.string(),
    highlight: z.string(),
    poster: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = {
  guides: guidesCollection,
  teardowns: teardownsCollection,
  templates: templatesCollection,
  works: worksCollection,
};
