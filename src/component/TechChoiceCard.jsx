import { Heart } from 'lucide-preact'

export const TechChoiceCard = ({
  title,
  linkText = 'Documentation',
  link,
  icon = <Heart />,
  children,
}) => {
  return (
    <div class='tech-card box p-4'>
      <div class='tech-card-top-row'>
        <div>
          <div class='tech-card-title'>{title}</div>
          <a href={link}>{linkText}</a>
        </div>
        <div>{icon}</div>
      </div>
      <p>{children}</p>
    </div>
  )
}
