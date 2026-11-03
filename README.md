# UX Heuristic Audit V2

**Author:** Prof. Mohammad Lataifeh @ University of Sharjah

## Assignment overview

UX Heuristic Audit V2 is an interactive, screenshot-led workbook for auditing a contemporary digital platform. Students evaluate the platform systematically against ten usability heuristics, document successful design patterns, diagnose user-experience defects, and propose visually supported alternatives.

Students select one platform from one of these categories:

- Government service
- E-commerce platform
- University website
- Food-delivery platform
- Social-media platform

The audit should focus on a coherent, realistic user task or journey rather than unrelated screens. Students must base their observations on actual platform behavior and must not fabricate features, examples, or error states.

## Required work

### 1. Audit all ten heuristics

Complete every heuristic in sequence. For each heuristic, document **three different successful deployments** on the selected platform, producing **30 strength examples in total**.

Each strength example requires:

- A cropped screenshot of the relevant interface region
- A concise evidence title and interface location
- An observation describing what the interface does
- Reasoning that connects the example to the heuristic
- An explanation of the benefit to the user

The canonical heuristic remains the basis for evaluation. Contemporary or AI-focused lenses are used only when they are relevant to the selected platform.

### 2. Analyze five UX defects

Document **five separate defect case studies**. Each case study requires:

- A primary heuristic and, where useful, secondary heuristic mappings
- A severity rating from 0 to 4
- A clear description of the defect and its impact on users
- A “before” screenshot showing the problem
- A plausible improved alternative with a visual “after” proposal

### 3. Complete the synthesis

Finish with a concise cross-heuristic synthesis that identifies recurring patterns, prioritizes improvements, and reflects on the selected platform’s overall user experience.

## Screenshot workflow

Students can capture a region with a marquee or freehand screenshot tool, then paste it directly into an image field with **Ctrl+V** or **Cmd+V**. Images can also be dragged into a field or selected through the file browser. Screenshots are resized and compressed in the browser before being stored.

Only the relevant interface region should be included. Crop out unrelated content and redact personal information before adding an image.

## Saving, backup, and submission

- Work is **automatically saved in the current browser** using local browser storage.
- Browser-local saving does not synchronize between devices or browsers and may be lost if browser data is cleared.
- Students can download a **JSON backup** at any stage and restore it later.
- The final **ZIP submission** is enabled only after all required sections are complete. It contains the standalone HTML report, workbook data, and submission notes.
- A **printable HTML report** can be opened for review or printing.
- After an export, any further edit marks the submission as pending until it is exported again.
- The exit check warns about unfinished work or changes that have not been exported. Students should save and verify their final ZIP before leaving the workbook.

## Privacy and safe conduct

Use test accounts and non-destructive tasks where possible. Do not include passwords, private messages, payment details, or other people’s personal data. Never enter real payment information or perform destructive actions for this assignment.

## Assessment

The assignment is assessed out of 100 points across heuristic coverage, quality of visual evidence, heuristic reasoning, defect diagnosis, quality of proposed alternatives, and final synthesis.

## Project commands

```bash
npm install
npm run dev
npm run build
```

The production build is generated in `dist/`.

## Host on GitHub Pages

The package includes an automated deployment workflow at `.github/workflows/deploy.yml`. No backend is required.

1. Extract the ZIP before uploading it. Create a new GitHub repository and add all extracted files, including the hidden `.github` folder.
2. Use `main` as the default branch. If your repository uses another branch, update the branch name in `.github/workflows/deploy.yml`.
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open the **Actions** tab. The deployment runs after each push to `main`; you can also select **Deploy to GitHub Pages** and choose **Run workflow**.
5. After the workflow succeeds, GitHub displays the site URL in the deployment summary and under **Settings → Pages**. A project site normally uses `https://USERNAME.github.io/REPOSITORY/`.

The Vite configuration uses relative asset paths, so the site works both at a repository subpath and at a custom domain.

### Local development

```bash
npm ci
npm run dev
```

Use `npm run build` to create the production site and `npm run preview` to check that build locally.

> Student work remains in each student's own browser. GitHub Pages hosts the workbook but does not provide shared cloud storage or server-side submission collection.
