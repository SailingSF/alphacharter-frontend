import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Paper, TextField, Button, Typography, Card, CardContent, Grid, Snackbar, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { Refresh as RefreshIcon, Info as InfoIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { marked } from 'marked';


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
        'Compare Tesla, NVIDIA, and IBM stock performance since 2018',
        'Price to sales ratio for all auto companies since 2020',
        'Revenue of top 5 tech companies over the last 5 years',
        'Debt to equity ratio of major banks like JP Morgan since 2015',
        'Recent free cash flow from oil companies like Exxon',
        ' What is the market cap of FAANG stocks for the past 3 years',
    ];

    const instructions = "Instructions: Tell me what financial chart you want generated. Use the examples below as ideas and feel free to switch up the stocks or metrics in the prompt."

    useEffect(() => {
        axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
      }, [accessToken]);

      const handleSubmit = async () => {
        setThreadId(null);
        setIsLoading(true);
        setError('');
        setResults([]);

        const payload = {
          prompt: prompt,
          //...(threadId && { thread_id: threadId }),
        };
    
        try {
          const response = await axiosInstance.post('api/submit_mini_prompt/', payload);
          const { job_id, thread_id } = response.data;
          setThreadId(thread_id);
    
          await checkJobStatus(job_id);
        } catch (err) {
          if (err.response && err.response.status === 401) {
            // Token refresh handled automatically by the interceptor
            // If 401, refresh has failed
            setError("Your session has expired. Please log in again.");
          } else if (error.response) {
            setError('An error occurred while submitting the prompt. Please try again.');
          }
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
              if (Array.isArray(result) && result.length > 0 && result[0].response) {
                const formattedResults = [{
                  imageUrl: result[0].response.image_url,
                  analysis: result[0].response.text
                }];
                setResults(formattedResults);
                setIsLoading(false);
                return;
              } else {
                setError('Unexpected result format. Please check the console for details.');
                console.error('Unexpected result format:', result);
              }
            } else if (status === 'FAILED') {
              setError('Job processing failed. Please try again.');
            } else if (status !== 'PENDING') {
              setError(`Unexpected job status: ${status}. Please try again.`);
            } else {
              // If status is still 'PENDING', wait before retrying
              await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
              continue;
            }
      
            setIsLoading(false);
            return;
      
          } catch (err) {
            if (err.response && err.response.status === 401) {
              // Token refresh handled automatically by the interceptor
              // If 401, refresh has failed
              setError("Your session has expired. Please log in again.");
            } else if (error.response) {
              setError(error.response.data.error) // set error as API error if not invalid token error
            }
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

    const clearPreviousQuery = () => {
      setPrompt('');
      setResults([]);
      setThreadId(null);
      setError('');
    };
    
    const theme = useTheme();

    return (
        <Container maxWidth="lg">
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', backgroundColor: theme.palette.background.paper }}>
            <Typography variant="h4" gutterBottom>
              AlphaAI Chart Maker
            </Typography>
            {results.map((result, index) => (
              <Card key={index} style={{ marginTop: '20px', marginBottom: '20px' }}>
                <CardContent>
                  <img 
                    src={result.imageUrl} 
                    alt={`Financial Chart ${index + 1}`} 
                    style={{ 
                      width: '100%', 
                      maxHeight: '500px', // Adjust this value as needed
                      objectFit: 'contain'
                    }} 
                  />
                  <Typography 
                    variant="body1" 
                    style={{ 
                      marginTop: '20px', 
                      fontSize: '1.1rem', 
                      lineHeight: '1.5',
                      whiteSpace: 'normal'
                    }}
                    dangerouslySetInnerHTML={{ __html: marked(result.analysis) }}
                  />
                </CardContent>
              </Card>
            ))}
            <hr style={{ margin: '20px 0', border: 'none', borderBottom: '1px solid #ccc' }} />
            <Typography variant='body1' gutterBottom>
              {instructions}
            </Typography>
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
            <Grid container spacing={3} style={{ marginBottom: '20px', marginTop: '10px' }}>
              {examplePrompts.map((example, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="body2">{example}</Typography>
                      <Button 
                        size="small" 
                        color="primary" 
                        onClick={() => {
                          clearPreviousQuery();
                          setPrompt(example);
                        }}
                      >
                        Use This Prompt
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
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