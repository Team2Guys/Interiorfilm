import Slider from 'components/Carousel/Slider/Slider'
import Container from 'components/Layout/Container/Container'
import React from 'react'

const Testimonial:React.FC = () => {
  return (
    <div className='bg-client bg-cover bg-no-repeat h-[450px] w-full mt-10'>
        <Container className='pt-20'>
        <Slider
        Reviews={[
            { name: "Abdur Razzak", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" },
            { name: "John Doe", detail: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium" },
            { name: "Jane Smith", detail: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum" },
            { name: "Jane Smith", detail: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum" },
            { name: "Jane Smith", detail: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum" },
            { name: "Jane Smith", detail: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum" },
            { name: "Jane Smith", detail: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum" },
        ]}
        />
        </Container>
    </div>
  )
}

export default Testimonial