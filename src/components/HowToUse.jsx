import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent,
  Button,
  Paper,
  useTheme
} from '@mui/material';



const steps = [
  {
    label: 'Getting Started',
    description: 'Navigate to the AlphaAI Chart Maker from the main dashboard.',
  },
  {
    label: 'Enter Your Prompt',
    description: 'Describe the financial chart you want to generate in the prompt box.',
  },
  {
    label: 'Generate Chart',
    description: 'Click the "Generate Chart" button to create your visualization.',
  },
  {
    label: 'Analyze Results',
    description: 'Review the generated chart and accompanying analysis.',
  },
];

const HowToPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const theme = useTheme();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 2, borderRadius: 2 }}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" component="h1" align='center' gutterBottom>
            How to Use AlphaCharter
          </Typography>
          
          <Typography variant="h5" component="h2" gutterBottom>
            Introduction
          </Typography>
          <Typography paragraph>
            AlphaCharter makes financial analysis easy and accessible. With our AI-powered Chart Maker, you can quickly generate insightful visualizations of financial data.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            Using the Chart Maker
          </Typography>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
           Demo Video
         </Typography>
         <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', mb: 4 }}>
           <iframe
             style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
             src="https://www.youtube.com/embed/PqVe-onPy04?si=wo9OdMXfUlBZi4oV"
             title="AlphaCharter Chart Maker Demo"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowFullScreen
           ></iframe>
         </Box>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            Understanding Results
          </Typography>
          <Typography paragraph>
            After generating a chart, you'll see a visualization accompanied by an analysis. The analysis provides key observations and insights about the data presented in the chart. The chart is made with public up to date data of the requested companies.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            Tips and Best Practices
          </Typography>
          <Typography paragraph>
            1. Be specific in your prompts about the timeframe and companies  or types of companies you're interested in. <br></br>
            2. Don't be afraid to tweak your prompt and ask again if there's something you don't like. <br></br>
            3. Use industry-specific metrics to gain deeper insights into particular sectors, the analysis will often explain the metrics so don't be worried about being unfamiliar with certain ratios.<br></br>
            4. Sign up for AlphaCharter's AI chat to learn more and explore data on a deeper level!
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
            FAQs
          </Typography>
          <Typography paragraph>
            Q: How far back does the historical data go?
            A: Our database typically contains financial data going back to the early 2000s for most publicly traded companies.

            Q: Can I export the generated charts?
            A: Yes, you can download charts as PNG or SVG files for use in your own reports or presentations.
          </Typography>
        </Box>
        </Paper>
      </Container>

  );
};

export default HowToPage;