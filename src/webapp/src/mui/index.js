import React, { useEffect } from 'react';
import {
  Avatar as ChakraAvatar,
  Box as ChakraBox,
  Button as ChakraButton,
  Divider as ChakraDivider,
  Flex,
  FormControl as ChakraFormControl,
  FormLabel,
  Input,
  List as ChakraList,
  ListItem as ChakraListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Select as ChakraSelect,
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Switch as ChakraSwitch,
  Text,
  useToast,
  Checkbox as ChakraCheckbox,
  Stack,
  IconButton as ChakraIconButton,
  VisuallyHidden,
} from '@chakra-ui/react';

const applySx = (sx = {}, style = {}) => ({ ...style, ...sx });

export const Grid = ({
  container,
  item,
  xs,
  sm,
  spacing,
  direction,
  justifyContent,
  alignItems,
  sx,
  children,
  ...rest
}) => {
  const basis = item
    ? {
        base: xs ? `${(xs / 12) * 100}%` : undefined,
        md: sm ? `${(sm / 12) * 100}%` : undefined,
      }
    : undefined;

  if (container) {
    return (
      <Flex
        wrap="wrap"
        direction={direction}
        justify={justifyContent}
        align={alignItems}
        gap={spacing ? `${spacing * 8}px` : undefined}
        style={applySx(sx)}
        {...rest}
      >
        {children}
      </Flex>
    );
  }

  return (
    <ChakraBox
      flexBasis={basis}
      maxW={basis}
      width={basis}
      style={applySx(sx)}
      {...rest}
    >
      {children}
    </ChakraBox>
  );
};

const typographySizes = {
  h1: { fontSize: '3xl', fontWeight: 'bold' },
  h2: { fontSize: '2xl', fontWeight: 'bold' },
  h3: { fontSize: 'xl', fontWeight: 'bold' },
  h4: { fontSize: 'lg', fontWeight: 'bold' },
  h5: { fontSize: 'md', fontWeight: 'bold' },
  h6: { fontSize: 'sm', fontWeight: 'bold' },
  subtitle1: { fontSize: 'md' },
  subtitle2: { fontSize: 'sm' },
  body1: { fontSize: 'md' },
  body2: { fontSize: 'sm' },
  caption: { fontSize: 'xs' },
};

export const Typography = ({ variant = 'body1', gutterBottom, sx, children, ...rest }) => (
  <Text
    {...typographySizes[variant]}
    mb={gutterBottom ? 2 : 0}
    style={applySx(sx)}
    {...rest}
  >
    {children}
  </Text>
);

export const Slider = ({ value, min, max, step, onChange, onChangeCommitted, disabled, sx, ...rest }) => (
  <ChakraSlider
    value={value}
    min={min}
    max={max}
    step={step}
    isDisabled={disabled}
    onChange={(val) => onChange?.(null, val)}
    onChangeEnd={(val) => onChangeCommitted?.(null, val)}
    style={applySx(sx)}
    {...rest}
  >
    <SliderTrack>
      <SliderFilledTrack />
    </SliderTrack>
    <SliderThumb />
  </ChakraSlider>
);

export const IconButton = ({ color, children, component, sx, ...rest }) => (
  <ChakraIconButton
    variant="ghost"
    colorScheme={color === 'secondary' ? 'gray' : 'brand'}
    icon={children}
    style={applySx(sx)}
    as={component}
    {...rest}
  />
);

export const Paper = ({ elevation = 0, sx, children, ...rest }) => (
  <ChakraBox
    bg="gray.800"
    borderRadius="md"
    boxShadow={elevation ? `lg` : undefined}
    style={applySx(sx)}
    {...rest}
  >
    {children}
  </ChakraBox>
);

const mapVariant = (variant) => {
  if (variant === 'outlined') return 'outline';
  if (variant === 'text') return 'ghost';
  return 'solid';
};

export const Button = ({ color, variant = 'solid', sx, children, ...rest }) => (
  <ChakraButton
    colorScheme={color === 'secondary' ? 'gray' : 'brand'}
    variant={mapVariant(variant)}
    style={applySx(sx)}
    {...rest}
  >
    {children}
  </ChakraButton>
);

export const Dialog = ({ open, onClose, children, fullWidth, maxWidth }) => (
  <Modal isOpen={open} onClose={onClose || (() => {})} size={maxWidth || (fullWidth ? 'xl' : 'md')}>
    <ModalOverlay />
    <ModalContent>{children}</ModalContent>
  </Modal>
);

export const DialogTitle = ({ children, sx, ...rest }) => (
  <ModalHeader style={applySx(sx)} {...rest}>
    {children}
    <ModalCloseButton />
  </ModalHeader>
);

export const DialogContent = ({ children, sx, ...rest }) => (
  <ModalBody style={applySx(sx)} {...rest}>
    {children}
  </ModalBody>
);

export const DialogContentText = ({ children, sx, ...rest }) => (
  <Text style={applySx(sx)} {...rest}>
    {children}
  </Text>
);

export const DialogActions = ({ children, sx, ...rest }) => (
  <ModalFooter style={applySx(sx)} {...rest}>
    {children}
  </ModalFooter>
);

export const Snackbar = ({ open, message, autoHideDuration = 3000, onClose }) => {
  const toast = useToast();

  useEffect(() => {
    if (open) {
      const id = toast({ description: message, duration: autoHideDuration, status: 'error', onCloseComplete: onClose });
      return () => toast.close(id);
    }
    return undefined;
  }, [open, message, autoHideDuration, onClose, toast]);

  return null;
};

export const BottomNavigation = ({ value, onChange, children, sx }) => (
  <Flex
    as="nav"
    position="fixed"
    bottom="0"
    width="100%"
    bg="gray.800"
    borderTopWidth="1px"
    justify="space-around"
    style={applySx(sx)}
    zIndex={10}
  >
    {React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        selected: value === index,
        onSelect: (event) => onChange?.(event, index),
      }),
    )}
  </Flex>
);

export const BottomNavigationAction = ({ label, icon, selected, onSelect, component, sx, ...rest }) => {
  const ComponentProp = component || 'button';

  return (
  <ChakraButton
    leftIcon={icon}
    variant={selected ? 'solid' : 'ghost'}
    colorScheme="brand"
    height="65px"
    flex="1"
    borderRadius={0}
    fontWeight="medium"
    style={applySx(sx)}
    onClick={onSelect}
    as={ComponentProp}
    {...rest}
  >
    <VisuallyHidden>{label}</VisuallyHidden>
    {icon}
  </ChakraButton>
  );
};

export const CircularProgress = (props) => <Spinner thickness="4px" speed="0.65s" color="brand.400" {...props} />;

export const Fab = ({ color = 'primary', sx, children, ...rest }) => (
  <ChakraIconButton
    position="fixed"
    bottom="80px"
    right="24px"
    colorScheme={color === 'secondary' ? 'gray' : 'brand'}
    borderRadius="full"
    boxShadow="lg"
    icon={children}
    style={applySx(sx)}
    {...rest}
  />
);

export const List = ({ children, sx, ...rest }) => (
  <ChakraList style={applySx(sx)} {...rest}>
    {children}
  </ChakraList>
);

export const ListItem = ({ children, button, secondaryAction, sx, ...rest }) => (
  <ChakraListItem style={applySx(sx)} {...rest}>
    <Flex align="center" justify="space-between" width="100%" gap={3}>
      <ChakraBox flex="1">
        {button ? (
          <ChakraButton variant="ghost" width="100%" justifyContent="flex-start">
            {children}
          </ChakraButton>
        ) : (
          children
        )}
      </ChakraBox>
      {secondaryAction}
    </Flex>
  </ChakraListItem>
);

export const ListItemButton = ({ children, component, sx, ...rest }) => (
  <ChakraButton
    variant="ghost"
    width="100%"
    justifyContent="flex-start"
    style={applySx(sx)}
    as={component}
    {...rest}
  >
    {children}
  </ChakraButton>
);

export const ListItemText = ({ primary, secondary, sx, ...rest }) => (
  <ChakraBox style={applySx(sx)} {...rest}>
    {primary && <Text fontWeight="semibold">{primary}</Text>}
    {secondary && <Text fontSize="sm" color="gray.300">{secondary}</Text>}
  </ChakraBox>
);

export const Switch = ({ sx, ...rest }) => <ChakraSwitch style={applySx(sx)} {...rest} />;

export const FormControlLabel = ({ control, label, sx, ...rest }) => (
  <Flex align="center" gap={2} style={applySx(sx)} {...rest}>
    {control}
    <Text>{label}</Text>
  </Flex>
);

export const FormGroup = ({ children, sx, ...rest }) => (
  <Stack spacing={2} style={applySx(sx)} {...rest}>
    {children}
  </Stack>
);

export const Select = ({ children, sx, ...rest }) => (
  <ChakraSelect style={applySx(sx)} {...rest}>
    {children}
  </ChakraSelect>
);

export const MenuItem = ({ value, children, sx, ...rest }) => (
  <option value={value} style={applySx(sx)} {...rest}>
    {children}
  </option>
);

export const InputLabel = ({ children, sx, ...rest }) => (
  <FormLabel style={applySx(sx)} {...rest}>
    {children}
  </FormLabel>
);

export const FormControl = ({ children, sx, ...rest }) => (
  <ChakraFormControl style={applySx(sx)} {...rest}>
    {children}
  </ChakraFormControl>
);

export const TextField = ({ label, sx, InputProps, ...rest }) => (
  <ChakraFormControl style={applySx(sx)}>
    {label && <FormLabel>{label}</FormLabel>}
    <Input {...rest} {...(InputProps || {})} />
  </ChakraFormControl>
);

export const Box = ({ sx, children, ...rest }) => (
  <ChakraBox style={applySx(sx)} {...rest}>
    {children}
  </ChakraBox>
);

export const Avatar = ({ sx, ...rest }) => (
  <ChakraAvatar style={applySx(sx)} {...rest} />
);

export const ListItemAvatar = ({ children, sx, ...rest }) => (
  <ChakraBox mr={3} style={applySx(sx)} {...rest}>
    {children}
  </ChakraBox>
);

export const Divider = ({ sx, ...rest }) => (
  <ChakraDivider style={applySx(sx)} {...rest} />
);

export const Card = ({ children, sx, ...rest }) => (
  <ChakraBox
    borderWidth="1px"
    borderRadius="md"
    boxShadow="md"
    bg="gray.800"
    style={applySx(sx)}
    {...rest}
  >
    {children}
  </ChakraBox>
);

export const CardHeader = ({ title, subheader, sx, ...rest }) => (
  <ChakraBox p={4} borderBottomWidth="1px" style={applySx(sx)} {...rest}>
    {title && <Text fontWeight="bold">{title}</Text>}
    {subheader && <Text fontSize="sm" color="gray.300">{subheader}</Text>}
  </ChakraBox>
);

export const CardContent = ({ children, sx, ...rest }) => (
  <ChakraBox p={4} style={applySx(sx)} {...rest}>
    {children}
  </ChakraBox>
);

export const CardActions = ({ children, sx, ...rest }) => (
  <Flex p={4} gap={2} justify="flex-end" style={applySx(sx)} {...rest}>
    {children}
  </Flex>
);

export const LinearProgress = ({ value, sx, ...rest }) => (
  <Progress value={value} colorScheme="brand" style={applySx(sx)} {...rest} />
);

export const Checkbox = ({ sx, ...rest }) => (
  <ChakraCheckbox style={applySx(sx)} {...rest} />
);

export const useTheme = () => ({
  palette: {
    mode: 'dark',
    primary: { main: '#319795' },
    secondary: { main: '#4a5568' },
  },
  spacing: (factor) => `${factor * 8}px`,
});

export default {
  Grid,
  Typography,
  Slider,
  IconButton,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  BottomNavigation,
  BottomNavigationAction,
  CircularProgress,
  Fab,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Switch,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Box,
  Avatar,
  ListItemAvatar,
  Divider,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  LinearProgress,
  Checkbox,
  useTheme,
};
