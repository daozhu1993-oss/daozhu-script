import { z } from 'astro:content';

const sources = {
  AIbase: 'aibase.com', '量子位': 'qbitai.com', AWN: 'awn.com',
  'Animation Magazine': 'animationmagazine.net', 'befores & afters': 'beforesandafters.com',
  CineD: 'cined.com', '新片场': 'xinpianchang.com', '人人都是产品经理': 'woshipm.com',
} as const;
const day = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const issueSchema = z.object({
  date: day,
  items: z.array(z.object({
    title: z.string().trim().min(1), topic: z.string().trim().min(1),
    source: z.enum(Object.keys(sources) as [keyof typeof sources, ...(keyof typeof sources)[]]),
    url: z.string().url(), published: day,
    summary: z.string().trim().min(1), exercise: z.string().trim().min(1),
  })).min(1).max(4),
});
export type Issue = z.infer<typeof issueSchema>;
const files = import.meta.glob('../data/digest/*.json', { eager: true, import: 'default' });
const seen = new Set<string>();
export const issues = Object.entries(files).map(([file, data]) => {
  const issue = issueSchema.parse(data);
  if (!file.endsWith('/' + issue.date + '.json')) throw new Error('期号与文件名不符：' + file);
  for (const item of issue.items) {
    const link = new URL(item.url);
    const age = Date.parse(issue.date) - Date.parse(item.published);
    if (!Number.isFinite(age) || age < 0 || age > 3 * 86400000 ||
        link.protocol !== 'https:' || link.hostname.replace(/^www\./, '') !== sources[item.source]) {
      throw new Error('请核对报道日期或来源：' + item.url);
    }
    const key = link.origin + link.pathname.replace(/\/$/, '');
    if (seen.has(key)) throw new Error('重复报道：' + item.url);
    seen.add(key);
  }
  return issue;
}).sort((a,b) => b.date.localeCompare(a.date));
export const digestPath = import.meta.env.BASE_URL.replace(/\/$/, '') + '/digest/';
