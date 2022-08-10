import React from "react";
import { Footer as FooterInfo } from "react-daisyui";

const Footer = () => {
  return (
    <footer className="sec bg-gray-800">
      <div className="container">
      <FooterInfo className="p-10 text-neutral-content">
        <div>
          <h3 className="text-red-400 text-[20px] font-semibold">E-commerce</h3>
          <p>
            Build By <a href="https://jsdevrazu.vercel.app/" target="_blank" rel="noopener" className="text-blue-400">jsdevrazu</a>
            <br />
            Providing reliable tech since { new Date().getFullYear()}
          </p>
        </div>

        <div>
          <FooterInfo.Title>Services</FooterInfo.Title>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <FooterInfo.Title>Company</FooterInfo.Title>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <FooterInfo.Title>Legal</FooterInfo.Title>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </FooterInfo>
      </div>
    </footer>
  );
};

export default Footer;
