/**
 *
 * PluginIcon
 *
 */

import styled from "styled-components";
import { Phone } from "@strapi/icons";

const StyledPhoneIcon = styled(Phone)`
  background: ${({ theme }) => theme.colors.primary100};
  padding: 4px;
  border-radius: 4px;
  path {
    fill: ${({ theme }) => theme.colors.success600};
  }
`;

const PluginIcon = () => <StyledPhoneIcon />;

export default PluginIcon;
