# OneShot

i was stuck in prompt engineering hell. you know the loop—write a prompt, get something close, tweak it, get closer, spend an hour just to get one decent output. burning credits the whole time.

so i built oneshot. you tell it what you need. it gives you results. no prompt ballet. no regenerate spam. just describe what you want and move on with your life.

## how to use it

go to **[oneshot-chi-nine.vercel.app](https://oneshot-chi-nine.vercel.app)**

1. write what you need (just be natural about it)
2. optionally pick a category or use a template
3. hit execute
4. get results in a few seconds
5. copy/download/save

that's the whole thing. seriously.

## what actually happens

- you describe a goal like "write me a 1-page business plan"
- oneshot hits gemini with the right prompting behind the scenes
- gemini returns something solid
- you get it. no waiting. no tweaking. no "try again"
- you download it, copy it, or keep it saved

## what can you build with it

business plans. marketing strategies. sales emails. research reports. study guides. code. design docs. competitor analysis. whatever you want to describe, it'll handle.

## features that matter

**templates** — 8 pre-built workflows (business plan, landing page, marketing strategy, etc). one click. done.

**keyboard shortcut** — press Cmd+K (mac) or Ctrl+K (windows) to jump to task creation from anywhere. power users appreciate this.

**saves your work** — everything you create gets saved. browse your history, download old results, never lose anything.

**settings that stick** — customize how it works (creativity, quality, speed, format, style). your preferences stay.

**clean errors** — hit rate limits? you get a clear message saying "try again in 30 seconds." no mystery.

## the tech

- next.js 15 (app router, typescript)
- gemini 2.5 flash (the ai backbone)
- tailwind css (styling)
- supabase (optional database—it still works without it)
- vercel (hosting)

all of it is minimal. no bloat. no unnecessary libraries. code is clean because i can't stand messy codebases.

## setup for development

```bash
git clone https://github.com/nadellasripad11/oneshot
cd oneshot
npm install
npm run dev
```

open localhost:3000. it'll work immediately.

build: `npm run build`  
deploy: `vercel deploy --prod`

optional: set up supabase for persistence. see DATABASE_SETUP.md.

## real talk

**will results be good?** yeah. gemini is solid. i prompt it right. you get professional-quality work.

**how fast?** simple stuff (emails, outlines) is 30 seconds. bigger stuff (research, plans) takes a few minutes. still beats spending an hour on prompts.

**can i use this commercially?** absolutely. whatever you create is yours. sell it. modify it. do whatever.

**what about my privacy?** tasks go to gemini. they're not stored permanently. you're not the product.

## who built this

me, [sripad nadella](https://sripadnadella.com). i'm a cs student who got tired of prompt engineering and built a tool that actually solves it. 

i used claude for brainstorming and debugging help. i built the actual app, wired it all together, and shipped it. pretty straightforward story.

## license

MIT. use it however you want.

---

**[go use it](https://oneshot-chi-nine.vercel.app)** — takes 30 seconds to see if it solves your problem.
