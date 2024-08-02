import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Paper, TextField, Button, Typography, Card, CardContent, Grid, Snackbar, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { Refresh as RefreshIcon, Info as InfoIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const axiosInstance = axios.create({
    baseURL: 'https://financeassistant-01-7c9325856268.herokuapp.com/',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  });

  const MAX_RETRIES = 35;
  const RETRY_INTERVAL = 2000;

function ChartMakerApp() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [prompt, setPrompt] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [threadId, setThreadId] = useState([]);


    const examplePrompts = [
        'Compare Tesla, NVIDIA, and IBM prices since 2018',
        'Price to sales ratio for all auto companies since 2020',
        'Revenue growth of top 5 tech companies over the last decade',
        'Debt to equity ratio of major banks from 2015 to 2023',
        'Dividend yield of energy sector companies since 2010',
        'Market cap comparison of FAANG stocks over time',
    ];

    useEffect(() => {
        axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
      }, [accessToken]);

      const handleSubmit = async () => {
        setIsLoading(true);
        setError('');
        setResults([]);

        const payload = {
          prompt: prompt,
          ...(threadId && { thread_id: threadId }),
        };
    
        try {
          const response = await axiosInstance.post('api/submit_mini_prompt/', payload);
          const { job_id, thread_id } = response.data;
          setThreadId(thread_id);
    
          await checkJobStatus(job_id);
        } catch (err) {
          setError('An error occurred while submitting the prompt. Please try again.');
          console.error('API call error:', err);
          setIsLoading(false);
        }
      };
    
      const checkJobStatus = useCallback(async (jobId) => {
    
        for (let i = 0; i < MAX_RETRIES; i++) {
          try {
            const response = await axiosInstance.get(`api/get_job_status/?job_id=${jobId}`);
            const { status, result } = response.data;
    
            if (status === 'complete') {
              if (Array.isArray(result.response) && result.response.length > 0) {
                const formattedResults = result.response.map(item => ({
                  imageUrl: item.image_url,
                  analysis: item.text,
                }));
                setResults(formattedResults);
              } else {
                setError('Unexpected result format. Please check the console for details.');
                console.error('Unexpected result format:', result);
              }
              setIsLoading(false);
              return;
            } else if (status === 'FAILED') {
              setError('Job processing failed. Please try again.');
              setIsLoading(false);
              return;
            } else if (status !== 'PENDING') {
              setError(`Unexpected job status: ${status}. Please try again.`);
              setIsLoading(false);
              return;
            }
    
            // If status is still 'PENDING', wait before retrying
            await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
          } catch (err) {
            console.error('Error checking job status:', err);
            // Continue retrying even if there's an error
          }
        }
    
        // If we've exhausted all retries
        setError('Job is taking longer than expected. Please try again later.');
        setIsLoading(false);
      }, []);

    const handleRetry = () => {
        setError('');
        handleSubmit();
    };
    
    const theme = useTheme();

    return (
        <Container maxWidth="lg">
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', backgroundColor: theme.palette.background.paper }}>
            <Typography variant="h4" gutterBottom>
              AlphaAI Chart Generator
            </Typography>
    
            <Grid container spacing={3} style={{ marginBottom: '20px' }}>
              {examplePrompts.map((example, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="body2">{example}</Typography>
                      <Button 
                        size="small" 
                        color="primary" 
                        onClick={() => setPrompt(example)}
                      >
                        Use This Prompt
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
    
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              margin="normal"
              placeholder="Edit your prompt here..."
            />
    
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSubmit}
              disabled={isLoading || !prompt}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isLoading ? 'Generating...' : 'Generate Chart'}
            </Button>
    
            {results.map((result, index) => (
              <Card key={index} style={{ marginTop: '20px' }}>
                <CardContent>
                  <img src={result.imageUrl} alt={`Financial Chart ${index + 1}`} style={{ width: '100%' }} />
                  <Typography variant="body1">{result.analysis}</Typography>
                </CardContent>
              </Card>
            ))}
    
            {error && (
              <Card style={{ marginTop: '20px', backgroundColor: '#ffebee' }}>
                <CardContent>
                  <Typography color="error">{error}</Typography>
                  <Button
                    startIcon={<RefreshIcon />}
                    onClick={handleRetry}
                    style={{ marginTop: '10px' }}
                  >
                    Retry
                  </Button>
                </CardContent>
              </Card>
            )}
    
            <Tooltip title="This app generates financial charts based on your prompts. Use natural language to describe the chart you want to see.">
              <IconButton style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
    
            <Snackbar
              open={isLoading}
              message="Generating your chart... This may take a few moments."
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            />
          </Paper>
        </Container>
      );
    }

    export default ChartMakerApp;