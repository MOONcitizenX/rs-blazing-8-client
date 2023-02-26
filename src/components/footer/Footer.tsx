import classNames from 'classnames';
import { useState } from 'react';
import style from './Footer.module.css';
import githubLogo from '../../assets/images/github.png';
import rsLogo from '../../assets/images/rs-school.png';

export const Footer = () => {
  const [isGithubMenuOpen, setIsGithubMenuOpen] = useState(false);

  return (
    <footer className={style.footerWrapper}>
      <div className={style.footer}>
        <div className={style.githubWrapper}>
          <button
            type="button"
            className={style.githubMenu}
            onClick={() => setIsGithubMenuOpen(!isGithubMenuOpen)}
          >
            <img className={style.githubMenuImage} src={githubLogo} alt="GitHub" />
          </button>
          <div
            className={classNames(style.githubLinksWrapper, { [style.active]: isGithubMenuOpen })}
          >
            <a
              className={style.githubLink}
              href="https://github.com/MOONcitizenX/"
              target="_blank"
              rel="noreferrer"
            >
              <img className={style.githubLogo} src={githubLogo} alt="GitHub" />
              <div className={style.githubName}>MOONcitizenX</div>
            </a>
            <a
              className={style.githubLink}
              href="https://github.com/mskmee/"
              target="_blank"
              rel="noreferrer"
            >
              <img className={style.githubLogo} src={githubLogo} alt="GitHub" />
              <div className={style.githubName}>mskmee</div>
            </a>
            <a
              className={style.githubLink}
              href="https://github.com/mkoroleva5/"
              target="_blank"
              rel="noreferrer"
            >
              <img className={style.githubLogo} src={githubLogo} alt="GitHub" />
              <div className={style.githubName}>mkoroleva5</div>
            </a>
          </div>
        </div>
        <p className={style.year}>2023</p>
        <div className={style.rsWrapper}>
          <a className={style.rsLink} href="https://rs.school/js/" target="_blank" rel="noreferrer">
            <img className={style.rsLogo} src={rsLogo} alt="Rolling Scopes School" />
          </a>
        </div>
      </div>
    </footer>
  );
};
