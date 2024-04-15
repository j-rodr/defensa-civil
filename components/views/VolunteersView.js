import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../utils/theme';
import { API_URL } from '../../utils/constants';
import { useState, useEffect } from 'react';
import DropdownTile from '../DropdownTile';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VolunteersView({ navigateTo, setLogin, isLoggedIn }) {
  const [session, setSession] = useState({ name: '', email: '', token: '' });

  useEffect(() => {
    const getSession = async () => {
      try {
        const value = await AsyncStorage.getItem('session');
        setSession(value ? JSON.parse(value) : null);
      } catch (error) {
        console.log(error);
      }
    };

    getSession();
  }, []);

  const [passwordResetFormData, setPasswordResetFormData] = useState({
    clave_anterior: '',
    clave_nueva: '',
  });
  const [loadingPasswordReset, setLoadingPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState();

  useEffect(() => {
    const allPasswordResetFieldsFilled = Object.values(
      passwordResetFormData
    ).every((field) => field.length > 0);

    if (!allPasswordResetFieldsFilled) {
      setPasswordResetError('Por favor llene todos los campos.');
    } else {
      setPasswordResetError(null);
    }
  }, [passwordResetFormData]);

  const handlePasswordResetSubmit = () => {
    if (passwordResetError) {
      return;
    }

    const passwordResetFormDataObject = new FormData();

    for (const key in passwordResetFormData) {
      passwordResetFormDataObject.append(key, passwordResetFormData[key]);
    }

    passwordResetFormDataObject.append('token', session?.token);

    setLoadingPasswordReset(true);

    fetch(`${API_URL}/cambiar_clave.php`, {
      method: 'POST',
      body: passwordResetFormDataObject,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exito) {
          alert('¡Cambio de contraseña exitoso!');
          setPasswordResetFormData({});
        } else {
          alert(`Ha ocurrido un error: ${data.mensaje}`);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoadingPasswordReset(false));
  };

  const [signupFormData, setSignupFormData] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    correo: '',
    clave: '',
    telefono: '',
  });

  const storeSession = async (name, email, token) => {
    try {
      await AsyncStorage.setItem(
        'session',
        JSON.stringify({ name, email, token })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [signupError, setSignupError] = useState();
  const [loadingSubmission, setLoadingSubmission] = useState(false);

  useEffect(() => {
    const allSignupFieldsFilled = Object.values(signupFormData).every(
      (field) => field.length > 0
    );

    if (!allSignupFieldsFilled) {
      setSignupError('Por favor llene todos los campos.');
    } else {
      setSignupError(null);
    }
  }, [signupFormData]);

  const onSignupSubmit = () => {
    if (signupError) {
      return;
    }

    setLoadingSubmission(true);

    const signupFormDataObject = new FormData();

    for (const key in signupFormData) {
      signupFormDataObject.append(key, signupFormData[key]);
    }

    fetch(`${API_URL}/registro.php`, {
      method: 'POST',
      body: signupFormDataObject,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exito) {
          alert(
            '¡Registro exitoso! Ya puede ingresar a la aplicación con sus credenciales.'
          );
          setSignupFormData({});
        } else {
          alert(`Ha ocurrido un error: ${data.mensaje}`);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoadingSubmission(false));
  };

  const [loginFormData, setLoginFormData] = useState({ cedula: '', clave: '' });
  const [loginError, setLoginError] = useState();
  const [loadingLogin, setLoadingLogin] = useState(false);

  useEffect(() => {
    const allLoginFieldsFilled = Object.values(loginFormData).every(
      (field) => field.length > 0
    );

    if (!allLoginFieldsFilled) {
      setLoginError('Por favor llene todos los campos.');
    } else {
      setLoginError(null);
    }
  }, [loginFormData]);

  const onLoginSubmit = () => {
    if (loginError) {
      return;
    }

    setLoadingLogin(true);

    const loginFormDataObject = new FormData();

    for (const key in loginFormData) {
      loginFormDataObject.append(key, loginFormData[key]);
    }

    fetch(`${API_URL}/iniciar_sesion.php`, {
      method: 'POST',
      body: loginFormDataObject,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exito) {
          alert('¡Inicio de sesión exitoso!');
          setLoginFormData({});
          storeSession(data.datos.nombre, data.datos.correo, data.datos.token);
          setLogin(true);
          navigateTo('home');
        } else {
          alert(`Ha ocurrido un error: ${data.mensaje}`);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoadingLogin(false);
      });
  };

  return (
    <View
      style={{
        paddingHorizontal: 26,
        paddingVertical: 15,
      }}
    >
      {isLoggedIn && (
        <>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.BLUE,
            }}
          >
            Información de cuenta
          </Text>
          <View style={{ marginTop: 15, gap: 15 }}>
            <View style={{ gap: 5 }}>
              <Text
                style={{
                  color: COLORS.ORANGE,
                  fontSize: 19,
                  fontWeight: 'bold',
                }}
              >
                Nombre
              </Text>
              <Text
                style={{
                  color: '#4E4E4E',
                  fontSize: 19,
                  lineHeight: 22,
                }}
              >
                {session?.name}
              </Text>
            </View>

            <View style={{ gap: 5 }}>
              <Text
                style={{
                  color: COLORS.ORANGE,
                  fontSize: 19,
                  fontWeight: 'bold',
                }}
              >
                Correo electrónico
              </Text>
              <Text
                style={{
                  color: '#4E4E4E',
                  fontSize: 19,
                  lineHeight: 22,
                }}
              >
                {session?.email}
              </Text>
            </View>
          </View>
          <Text
            style={{
              paddingVertical: 18,
              fontSize: 17,
              color: '#4E4E4E',
              marginTop: 30,
            }}
          >
            ¿Olvidaste tu contraseña? Cámbiala aquí
          </Text>
          <DropdownTile icon='🔐' title='Cambiar contraseña'>
            <View
              style={{
                paddingTop: 26,
                paddingBottom: 14,
                gap: 20,
                paddingHorizontal: 10,
              }}
            >
              {loadingPasswordReset ? (
                <View style={{ paddingVertical: 10 }}>
                  <ActivityIndicator size='large' color={COLORS.BLUE} />
                </View>
              ) : (
                <>
                  <View>
                    <Text
                      style={{
                        color: COLORS.BLUE,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 10,
                      }}
                    >
                      Contraseña anterior
                    </Text>
                    <TextInput
                      style={{
                        borderWidth: 0.5,
                        borderRadius: 10,
                        borderColor: '#E3E3E3',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        fontSize: 17,
                      }}
                      onChangeText={(text) => {
                        setPasswordResetFormData({
                          ...passwordResetFormData,
                          clave_anterior: text,
                        });
                      }}
                      value={passwordResetFormData.clave_anterior}
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        color: COLORS.BLUE,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 10,
                      }}
                    >
                      Contraseña nueva
                    </Text>
                    <TextInput
                      style={{
                        borderWidth: 0.5,
                        borderRadius: 10,
                        borderColor: '#E3E3E3',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        fontSize: 17,
                      }}
                      onChangeText={(text) => {
                        setPasswordResetFormData({
                          ...passwordResetFormData,
                          clave_nueva: text,
                        });
                      }}
                      value={passwordResetFormData.clave_nueva}
                    />
                  </View>

                  {passwordResetError && (
                    <Text
                      style={{
                        color: COLORS.RED,
                        fontSize: 17,
                        fontWeight: 'bold',
                        marginTop: 24,
                      }}
                    >
                      {passwordResetError}
                    </Text>
                  )}

                  <Pressable onPress={handlePasswordResetSubmit}>
                    <Text
                      style={{
                        backgroundColor: COLORS.BLUE,
                        color: COLORS.WHITE,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        borderRadius: 8,
                        fontSize: 18,
                        textAlign: 'center',
                        marginTop: 15,
                      }}
                    >
                      Cambiar contraseña
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          </DropdownTile>
        </>
      )}
      {!isLoggedIn && (
        <>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.BLUE,
                textAlign: 'center',
              }}
            >
              🔒 Iniciar sesión
            </Text>
            {loadingLogin ? (
              <View style={{ paddingVertical: 10 }}>
                <ActivityIndicator size='large' color={COLORS.BLUE} />
              </View>
            ) : (
              <View style={{ paddingVertical: 26, gap: 20 }}>
                <View>
                  <Text
                    style={{
                      color: COLORS.BLUE,
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginBottom: 10,
                    }}
                  >
                    Cédula
                  </Text>
                  <TextInput
                    style={{
                      borderWidth: 0.5,
                      borderRadius: 10,
                      borderColor: '#E3E3E3',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      fontSize: 17,
                    }}
                    onChangeText={(text) => {
                      setLoginError(null);
                      setLoginFormData({ ...loginFormData, cedula: text });
                    }}
                    value={loginFormData.cedula}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      color: COLORS.BLUE,
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginBottom: 10,
                    }}
                  >
                    Clave
                  </Text>
                  <TextInput
                    style={{
                      borderWidth: 0.5,
                      borderRadius: 10,
                      borderColor: '#E3E3E3',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      fontSize: 17,
                    }}
                    onChangeText={(text) => {
                      setLoginError(null);
                      setLoginFormData({ ...loginFormData, clave: text });
                    }}
                    value={loginFormData.clave}
                  />
                </View>

                {loginError && (
                  <Text
                    style={{
                      color: COLORS.RED,
                      fontSize: 17,
                      fontWeight: 'bold',
                      marginTop: 24,
                    }}
                  >
                    {loginError}
                  </Text>
                )}

                <Pressable onPress={onLoginSubmit}>
                  <Text
                    style={{
                      backgroundColor: COLORS.BLUE,
                      color: COLORS.WHITE,
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 8,
                      fontSize: 18,
                      textAlign: 'center',
                      marginTop: 15,
                    }}
                  >
                    Acceder
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
          <Text
            style={{
              paddingVertical: 18,
              fontSize: 17,
              color: '#4E4E4E',
              textAlign: 'center',
            }}
          >
            ¿No tienes cuenta? Regístrate aquí
          </Text>
          <DropdownTile icon='📄' title='Inscribirme'>
            <View
              style={{
                marginTop: 15,
                paddingHorizontal: 10,
                paddingBottom: 14,
              }}
            >
              <Text style={{ color: '#4E4E4E', fontSize: 16, lineHeight: 24 }}>
                Si deseas ser voluntario, por favor llena el siguiente
                formulario.
              </Text>
              {loadingSubmission ? (
                <View style={{ paddingVertical: 10 }}>
                  <ActivityIndicator size='large' color={COLORS.BLUE} />
                </View>
              ) : (
                <View style={{ paddingTop: 20, gap: 18 }}>
                  <View>
                    <Text
                      style={{
                        color: COLORS.BLUE,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 10,
                      }}
                    >
                      Cédula
                    </Text>
                    <TextInput
                      style={{
                        borderWidth: 0.5,
                        borderRadius: 10,
                        borderColor: '#E3E3E3',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        fontSize: 17,
                      }}
                      onChangeText={(text) => {
                        setSignupError(null);
                        setSignupFormData({ ...signupFormData, cedula: text });
                      }}
                      value={signupFormData.cedula}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: COLORS.BLUE,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 10,
                      }}
                    >
                      Nombre
                    </Text>
                    <TextInput
                      style={{
                        borderWidth: 0.5,
                        borderRadius: 10,
                        borderColor: '#E3E3E3',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        fontSize: 17,
                      }}
                      onChangeText={(text) => {
                        setSignupError(null);
                        setSignupFormData({ ...signupFormData, nombre: text });
                      }}
                      value={signupFormData.nombre}
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        color: COLORS.BLUE,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 10,
                      }}
                    >
                      Apellido
                    </Text>
                    <TextInput
                      style={{
                        borderWidth: 0.5,
                        borderRadius: 10,
                        borderColor: '#E3E3E3',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        fontSize: 17,
                      }}
                      onChangeText={(text) => {
                        setSignupError(null);
                        setSignupFormData({
                          ...signupFormData,
                          apellido: text,
                        });
                      }}
                      value={signupFormData.apellido}
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        color: COLORS.BLUE,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 10,
                      }}
                    >
                      Correo
                    </Text>
                    <TextInput
                      style={{
                        borderWidth: 0.5,
                        borderRadius: 10,
                        borderColor: '#E3E3E3',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        fontSize: 17,
                      }}
                      onChangeText={(text) => {
                        setSignupError(null);
                        setSignupFormData({ ...signupFormData, correo: text });
                      }}
                      value={signupFormData.correo}
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        color: COLORS.BLUE,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 10,
                      }}
                    >
                      Contraseña
                    </Text>
                    <TextInput
                      style={{
                        borderWidth: 0.5,
                        borderRadius: 10,
                        borderColor: '#E3E3E3',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        fontSize: 17,
                      }}
                      onChangeText={(text) => {
                        setSignupError(null);
                        setSignupFormData({ ...signupFormData, clave: text });
                      }}
                      value={signupFormData.clave}
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        color: COLORS.BLUE,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 10,
                      }}
                    >
                      Teléfono
                    </Text>
                    <TextInput
                      style={{
                        borderWidth: 0.5,
                        borderRadius: 10,
                        borderColor: '#E3E3E3',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        fontSize: 17,
                      }}
                      onChangeText={(text) => {
                        setSignupError(null);
                        setSignupFormData({
                          ...signupFormData,
                          telefono: text,
                        });
                      }}
                      value={signupFormData.telefono}
                    />
                  </View>
                </View>
              )}

              {signupError && (
                <Text
                  style={{
                    color: COLORS.RED,
                    fontSize: 17,
                    fontWeight: 'bold',
                    marginTop: 24,
                  }}
                >
                  {signupError}
                </Text>
              )}

              <Pressable onPress={onSignupSubmit}>
                <Text
                  style={{
                    backgroundColor: COLORS.BLUE,
                    color: COLORS.WHITE,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 8,
                    fontSize: 18,
                    textAlign: 'center',
                    marginTop: 28,
                  }}
                >
                  Enviar datos
                </Text>
              </Pressable>
            </View>
          </DropdownTile>
        </>
      )}
    </View>
  );
}
