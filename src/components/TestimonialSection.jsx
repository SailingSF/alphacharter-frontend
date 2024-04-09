import React from 'react';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { useTheme } from '@mui/material/styles';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


// Mock data for testimonials
const testimonials = [
  { name: "Warren Buffet", text: "With AlphaCharter I've been able to do all my research on my own and make billion dollar investment decisions with only some prompts and the AI generated graphs." },
  { name: "Steve Cohen", text: "If I had AlphaCharter I wouldn't have needed to commit blatant of insider trading in order to make my billions, I would've just used this and skipped the part where I forced analysts to commit crimes and go to jail." },
  { name: "Michael Bloomberg", text: "I would charge $5,000 a month for this." },
  // Add more testimonials as needed
];

function TestimonialsSection() {
    const theme = useTheme();
    return (
        <Container maxWidth="lg" style={{ textAlign: 'center', padding: '20px', minHeight: '500px' }}>
        <Typography variant="h4" gutterBottom>
            Hear From Our Users
        </Typography>
        <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={true}
            autoplay={{
                delay: 5500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
                renderBullet: (index, className) => {
                    return `<span class="${className}" style="background-color: ${theme.palette.primary.mainVariant};"></span>`;
                }
            }}
        >
            {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} >
                <Card sx={{ 
                    mb: 4, 
                    boxShadow: '20px 20px 30px rgba(0,0,0,0.5)', 
                    minHeight: '250px', 
                    width: '600px',
                    mx: 'auto',
                    backgroundColor: theme.palette.background.light, 
                    border: `2px solid black`}}>
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}>
                    <Typography variant="h4" color={theme.palette.text.dark} sx={{ mb: 2 }}>{testimonial.name}</Typography>
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        }}>
                    <Typography variant="h5" color={theme.palette.text.dark}>{testimonial.text}</Typography>
                    </Box>  
                </CardContent>
                </Card>
            </SwiperSlide>
            ))}
        </Swiper>
        </Container>
    );
}

export default TestimonialsSection;
