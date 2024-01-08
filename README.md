# Satellite Campus presents UTSAA

About our Team:
Satellite Campus is a group of high school students across Toronto with a penchant for innovation. We're a mix of hackathon vets and rookies. Our more experienced members help out/mentor the less experienced. 
we have academic researchers, hardcore CS kids and everything in between!

About our project:
UTSAA - Universal Topic Selection Assistive Assessment Tool. UTSAA is an API built using open AI assistants and is capable of powerful parallel computing.

on the website homepage, the user is asked to input how much they value certain factors when choosing a solution. They can weigh factors using a slider on the homepage 

key factors such as:
- Creativity/Novelty
- Idea feasibility 
- management
- impact potential 
- environmental impact

as well as less quantitative factors ( more holistic evaluations and requires the creativity of human interpretation. ) These factors depend on the kind of project idea. 
after the data set is uploaded, UTSAA classifies and divides the project ideas by core focus
- hardware centric
- software centric
- community initiative 

along with the above classification, a single output contains:

- Qualitative Considerations: Generated considerations important for companies/ideas under a classification to consider.

- Quantitative Ratings: Ratings are determined based on dataset interpretations and our statistical equations. A percentage score is given to each solution based on the previous input of weighted values. 

- Data Visualization: results are then graphically illustrated with a polygon plot.


final product can be exported as a PDF 


### Installation
1. **Clone the Repository**:
   ```
   git clone https://github.com/admineral/OpenAI-Assistant-API-Chat.git
   ```
2. **Install Dependencies**:
   Navigate to the project directory and run:
   ```
   npm install
   ```
3. **Environment Setup**:
   Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```
4. **Run the Application**:
   Start the server with:
   ```
   npm run dev
   ```
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
