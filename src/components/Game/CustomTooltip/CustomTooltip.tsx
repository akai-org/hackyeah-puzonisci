import styles from './CustomTooltip.module.scss';

interface Props {
  isVisible: boolean;
}

export const CustomToolip = ({ isVisible }: Props) => {
  return (
    <div
      className={[styles.all, isVisible ? styles.open : styles.closed].join(
        ' ',
      )}
    >
      click me!
    </div>
  );
};
