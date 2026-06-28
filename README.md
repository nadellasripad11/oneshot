# OneShot — Stop Prompting. Start Getting Results.

honestly, we've all been there. you open chatgpt or claude. you spend 20 minutes writing the perfect prompt. it comes back... close but not right. so you try again. and again. and again.

after an hour of prompt engineering and burning through credits, you finally have something usable.

**oneshot exists because that's broken.**

## what is it?

oneshot is an app where you describe what you want in plain english, hit execute, and get a professional result. no prompt tweaking. no retries. no "let me regenerate that." you just say what you need and it handles everything.

that's it. it's that simple.

## how it actually works

1. **you describe your goal** — "build me a business plan" or "write a marketing strategy for my startup"
2. **gemini does the heavy lifting** — takes your goal, generates a comprehensive response tailored to what you asked
3. **you get the result** — download it, copy it, or use it immediately
4. **no prompt engineering required** — just natural language

the whole thing takes minutes. you don't wait long. you don't see the behind-the-scenes stuff. you just get results.

## why this works

most ai tools make you do the work. oneshot does the work for you. your job is just to ask.

## what you can do with it

**business stuff** — write a business plan, create a marketing strategy, analyze competitors, draft pitch decks  
**writing** — email sequences, sales copy, blog posts, documentation  
**research** — deep dives into topics, competitor analysis, market summaries  
**anything else** — literally just describe it and it'll handle it

## the real story

i built this because i got tired of spending hours on prompts. i wanted something that just... works. no tweaking. no retries. just describe what you want and get it.

the interface is clean and minimal because i hate clutter. the execution is fast because your time matters. everything is straightforward because complicated tools suck.

## how i built it

**next.js 15** — app router, typescript, strict mode  
**tailwind css** — styling without the pain  
**gemini 2.5 flash api** — solid AI backbone  
**supabase** — postgres database for task persistence  
**vercel** — deployed and live  

the code is clean. the design is intentional. everything has a reason.

## setting up the database (optional)

tasks are automatically saved if you configure Supabase. without it, everything still works — just no persistence.

[see DATABASE_SETUP.md for full instructions](./DATABASE_SETUP.md)

## features

**templates** — pre-made workflows for common tasks (business plans, landing pages, marketing strategies, etc). pick one and customize. saves time.

**keyboard shortcuts** — press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) to open quick task search from anywhere in the dashboard.

**saved results** — all your executed tasks are automatically saved. browse past results, download, or copy anytime.

**settings** — customize creativity level, quality, speed, output format, and writing style. preferences persist across sessions.

**task templates** — browse 8 pre-built templates optimized for different workflows. click to use.

**rate limiting** — 5 requests per minute per IP to prevent abuse. clean error messages if you hit the limit.

## try it

go to [oneshot-chi-nine.vercel.app](https://oneshot-chi-nine.vercel.app)

1. click "Create New Task" (or press `Cmd+K`)
2. describe what you want (or pick a template)
3. pick a category (optional)
4. hit Execute
5. watch it work
6. download, copy, or save your result

no account. no credit card. no setup. it just works.

## questions?

**will the result be good?**  
yes. gemini is solid and we prompt it right. results are professional-quality.

**how long?**  
depends on complexity. simple stuff (emails, outlines) is 30 seconds. bigger things (business plans, research) might be a few minutes. still way faster than doing it yourself.

**can i use it for my business?**  
absolutely. whatever you create is yours. build on it, sell it, whatever.

**is my data private?**  
your tasks get sent to gemini and aren't stored long-term. we don't use them for anything else. you're not the product here.

## if you want to dev on it

```bash
git clone https://github.com/nadellasripad11/oneshot
cd oneshot
npm install
npm run dev
```

open http://localhost:3000

to build: `npm run build`  
to deploy: `vercel deploy --prod`

## ai usage declaration

used claude for brainstorming the product idea and some debugging help. i built all the components, set up the design system, wired everything together, deployed it, wrote the readme. claude helped me think through architecture decisions and catch some bugs, but the actual execution and shipping was all me. pretty happy with how it turned out honestly.

## built by

[sripad nadella](https://sripadnadella.com) — cs student, full-stack engineer, tired of prompt engineering

## license

mit — do whatever you want with it

---

**try it out:** [oneshot-chi-nine.vercel.app](https://oneshot-chi-nine.vercel.app)

one goal. one result. no retries.
