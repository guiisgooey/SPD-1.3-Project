import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
  return (
    <section id='footer'>
      <div class='footer bg-dark p-4 text-white'>
        &copy; Ryan L., Andrew W., Jay M., Ashraj G. 2021
        <a
          class='btn btn-social-icon btn-github'
          href='https://github.com/ryd0g'
          target='blank'>
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          class='btn btn-social-icon btn-github'
          href='https://github.com/guiisgooey'
          target='blank'>
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          class='btn btn-social-icon btn-github'
          href='https://github.com/MaybeJaybe'
          target='blank'>
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          class='btn btn-social-icon btn-github'
          href='https://github.com/ashrajgrewal'
          target='blank'>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </section>
  );
}

export default Footer;
