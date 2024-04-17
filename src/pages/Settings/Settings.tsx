import {FC, useEffect} from 'react';
import {useStore} from "../../store";
import FormInput from "../../components/FormInput/FormInput";
import FormCheckBox from "../../components/FormCheckBox/FormCheckBox";
import c from './Settings.module.css'
import FormInputGroup from "../../components/FormInputGroup/FormInputGroup";

const Settings:FC = () => {
  const settings = useStore(state => state.settings)
  const theme = useStore(state => state.theme)
  const setTimerState = useStore(state => state.setTimerState)
  const updateSettings = useStore(state => state.updateSettings)

  useEffect(() => {
    document.title = 'Pomodoro -> настройки'
  }, [])

  const isDarkTheme = theme === 'dark'
  const printTime = (sec) => {
    const minutes = Math.floor(sec / 60)
    const seconds = Math.floor(sec % 60)
    return `${minutes} мин ${seconds} сек`
  }

  return (
    <div className={`${c.settings} ${isDarkTheme ? c.darkTheme : ''}`}>
      <h2 className={c.title}>Настройки</h2>
      <FormInputGroup>
        <FormInput
          isDarkTheme={isDarkTheme}
          type={'number'}
          comment={printTime(settings.pomodoroTimeCost)}
          text={'Продолжительность 1 помидора'}
          value={String(settings.pomodoroTimeCost)}
          onChange={(value) => {
            setTimerState({timeLeft: settings.pomodoroTimeCost * 10})
            updateSettings({pomodoroTimeCost: Number(value)})
          }}
        />

        <FormInput
          isDarkTheme={isDarkTheme}
          type={'number'}
          text={'Продолжительность короткого периода'}
          comment={printTime(settings.shortRestTime)}
          value={String(settings.shortRestTime)}
          onChange={(value) => updateSettings({shortRestTime:Number(value)})}
        />

        <FormInput
          isDarkTheme={isDarkTheme}
          type={'number'}
          text={'Продолжительность длинного периода'}
          comment={printTime(settings.longRestTime)}
          value={String(settings.longRestTime)}
          onChange={(value) => updateSettings({longRestTime:Number(value)})}
        />

        <FormInput
          isDarkTheme={isDarkTheme}
          text={'Частота длинных перерывов'}
          type={'number'}
          comment={`Длинный перерыв происходит каждую(ые) ${settings.longRestRate} задачу(и)`}
          value={String(settings.longRestRate)}
          onChange={(value) => updateSettings({longRestRate:Number(value)})}
        />

        <FormCheckBox
          isDarkTheme={isDarkTheme}
          checked={settings.notification}
          text={'Включить уведомления?'}
          onChange={(check) => updateSettings({notification: check})}
        />
      </FormInputGroup>
    </div>
  );
};

export default Settings;