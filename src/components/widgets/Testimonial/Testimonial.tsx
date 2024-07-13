import Slider from 'components/Carousel/Slider/Slider'
import Container from 'components/Layout/Container/Container'
import React from 'react'

const Testimonial:React.FC = () => {
  return (
    <div className='bg-client bg-cover bg-no-repeat pb-7 w-full mt-10'>
        <Container className='pt-20'>
        <Slider
        Reviews={[
            { name: "Abdur Razzak", detail: "I recently had the pleasure of working with Interior Film, and I am beyond impressed.", star:4, designation:"Ui Ux" },
            { name: "Aisha Malik", detail: "Interior Film transformed my home beautifully. Their respect for cultural preferences and outstanding quality exceeded my expectations. Highly recommend!", star:5, designation:"Frontend Developer"  },
            { name: "Tariq Noor", detail: "Interior Film did an amazing job on my living room. Their attention to detail and respect for my preferences were outstanding. Highly recommend!", star:3  },
            { name: "Bilal Ahmed", detail: "Exceptional service from Interior Film! They transformed our home with great care and precision. The team's professionalism was truly impressive. JazakAllah Khair", star:4  },
            { name: "Zayd Malik", detail: "Interior Film exceeded my expectations. Their creativity and commitment to customer satisfaction were evident in every aspect of the project. Wonderful experience", star:5  },
            { name: "Omar Ali", detail: "I am thrilled with the work Interior Film did on our house. They were respectful, efficient, and delivered top-notch results. Highly recommend their services", star:5  },
            { name: "Hassan Raza:", detail: "Interior Film provided excellent service. Their team was professional and attentive to our needs. Our home looks fantastic now. Thank you for a job well done!" , star:4 },
        ]}
        />
        </Container>
    </div>
  )
}

export default Testimonial