import { TypeAnimation } from 'react-type-animation'

const TextAnimation = () => {
  return (
    <TypeAnimation
    sequence={[
      // Same substring at the start will only be typed out once, initially
      'Chat With Your Own AI',
      1000, // wait 1s before replacing "Mice" with "Hamsters"
      'Built with OpenAI 🤖',
      2000,
      'Your Own Customize Chat GPT 💻',
      1500,
      
    ]}
    wrapper="span"
    speed={50}
    style={{ fontSize: '60px',color: 'white' , display:'inline-block' ,textShadow:'1px 1px 20px  #000' }}
    repeat={Infinity}
  />
  )
}

export default TextAnimation





