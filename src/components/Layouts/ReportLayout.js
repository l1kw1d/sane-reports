import './ReportLayout.less';
import React, { PropTypes } from 'react';
import { SectionHeader, SectionText, SectionChart } from '../Sections';
import { SECTION_TYPES } from '../../constants/Constants';

const ReportLayout = ({ data }) =>
  <div className="report-layout">
    {
      data
        .sort((row1, row2) => (row1.pos >= row2.pos ? 1 : -1)) // sort by row position
        .map((row) =>
          <div className="report-row" key={row.pos}>
            {
              row.columns
              .sort((sec1, sec2) => (sec1.pos >= sec2.pos ? 1 : -1)) // sort by section position inside a row
              .map((section) =>
                <div key={section.pos} className="report-section" style={section.style}>
                  {
                    (() => {
                      let sectionToRender;
                      switch (section.type) {
                        case SECTION_TYPES.header:
                          sectionToRender =
                            <SectionHeader header={section.data} style={section.style} />;
                          break;
                        case SECTION_TYPES.text:
                          sectionToRender =
                            <SectionText text={section.data} style={section.style} />;
                          break;
                        case SECTION_TYPES.chart:
                          sectionToRender = (
                            <SectionChart
                              type={section.chartType}
                              data={section.data}
                              style={section.style}
                              dimensions={section.dimensions}
                            />
                          );
                          break;
                        default:
                          // Ignored
                      }
                      return sectionToRender;
                    })()
                  }
                </div>
              )
            }
          </div>
        )
    }
  </div>
;
ReportLayout.propTypes = {
  data: PropTypes.array
};

export default ReportLayout;
