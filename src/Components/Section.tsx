import React, { ReactNode } from "react";
import SectionTitle from "./SectionTitle";
import { Row, Col } from "react-bootstrap";

interface SectionProps {
  children: ReactNode;
  sectionName: string;
}

const Section: React.FC<SectionProps> = (props) => {
  return (
      <Row className="p-5 m-0 bg-light g-4">
        <SectionTitle sectionName={props.sectionName} />
        {props.children}
      </Row>
  );
};

export default Section;
